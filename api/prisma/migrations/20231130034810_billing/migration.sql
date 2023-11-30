-- CreateTable
CREATE TABLE "BillingUserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeStatus" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingUserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingUserSubscription_userId_key" ON "BillingUserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BillingUserSubscription_stripeId_key" ON "BillingUserSubscription"("stripeId");

-- AddForeignKey
ALTER TABLE "BillingUserSubscription" ADD CONSTRAINT "BillingUserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
