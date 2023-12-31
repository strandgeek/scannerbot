import React, { FC, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Sidebar } from "./Sidebar";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe } from "../../client/queries/auth";
import { generateSubscriptionLink } from "../../client/mutations/billing";

export interface AppLayoutProps {
  title?: string;
  children?: React.ReactNode;
  container?: boolean;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  title,
  container = true,
}) => {
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
  const generateSubscriptionLinkMutation = useMutation({
    mutationFn: generateSubscriptionLink,
  });
  const mode = import.meta.env.VITE_SCANNERBOT_MODE;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hasActiveSubscription =
    meData?.subscription?.stripeStatus &&
    !["unpaid", "canceled"].includes(meData?.subscription?.stripeStatus);
  const subscribe = async () => {
    const { url } = await generateSubscriptionLinkMutation.mutateAsync();
    window.location.href = url;
  };
  return (
    <div className="h-screen flex overflow-hidden bg-base-200">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {container ? (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {mode === "cloud" && !hasActiveSubscription && (
                  <div
                    role="alert"
                    className="alert border border-red-500 text-red-500"
                  >
                    <ExclamationCircleIcon className="w-6 h-6 mr-2" />
                    <span>
                      You don't have an active subscription. Your scans are
                      paused
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={subscribe}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                )}
                <h1 className="text-2xl font-semibold text-gray-900">
                  {title}
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};
