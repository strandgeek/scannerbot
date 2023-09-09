import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useMemo, useRef } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";

const TYPE_CLASSES = {
  input: {
    base: 'input input-bordered',
    error: 'input-error text-error',
  },
  textarea: {
    base: 'textarea textarea-bordered',
    error: 'textarea-error text-error',
  },
  select: {
    base: 'select select-bordered',
    error: 'select-error text-error',
  },
}

export interface FormGroupRenderArgsProps<TName extends string>
  extends UseFormRegisterReturn<TName> {
  id: string;
  className?: string;
}

export interface FormGroupRenderArgs<T extends FieldValues> {
  props: FormGroupRenderArgsProps<Path<T>>;
  error: FieldErrors<T>[Path<T>];
}

export interface FormGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  type?: keyof typeof TYPE_CLASSES;
  render: (args: FormGroupRenderArgs<T>) => React.ReactNode;
}

export function FormGroup<T extends FieldValues>({
  form,
  name,
  label,
  type,
  render,
}: FormGroupProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];
  const { current: id } = useRef(`FormGroup-${name}`);
  const className = useMemo(() => {
    if (!type) {
      return;
    }
    const classes = TYPE_CLASSES[type];
    if (!classes) {
      return;
    }
    return classNames(classes.base, {
      [classes.error]: !!error,
    });
  }, [type, error]);
  return (
    <div className="form-control w-full">
      <label className="label">
        <span
          className={classNames("label-text flex items-center", {
            "text-error": error,
          })}
        >
          {error && <ExclamationCircleIcon className="w-4 h-4 mr-2" />}
          {label}
        </span>
      </label>
      {render({
        props: {
          ...register(name),
          id,
          className,
        },
        error,
      })}
      <label className="label">
        {error && (
          <span className="label-text-alt text-error">
            {error.message?.toString()}
          </span>
        )}
      </label>
    </div>
  );
}
