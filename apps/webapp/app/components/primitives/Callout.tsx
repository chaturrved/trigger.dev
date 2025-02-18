import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { cn } from "~/utils/cn";
import { Paragraph } from "./Paragraph";
import { Spinner } from "./Spinner";

export const variantClasses = {
  info: {
    className: "border-slate-700 bg-slate-800",
    icon: <InformationCircleIcon className="h-5 w-5 shrink-0 text-dimmed" />,
    textColor: "text-bright",
    linkClassName: "transition hover:bg-slate-750",
  },
  warning: {
    className: "border-yellow-400/20 bg-yellow-400/30",
    icon: <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-yellow-400" />,
    textColor: "text-yellow-200",
    linkClassName: "transition hover:bg-yellow-400/40",
  },
  error: {
    className: "border-rose-500/20 bg-rose-500/30",
    icon: <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-rose-400" />,
    textColor: "text-rose-200",
    linkClassName: "transition hover:bg-rose-500/40",
  },
  idea: {
    className: "border-green-400/20 bg-green-400/30",
    icon: <LightBulbIcon className="h-5 w-5 shrink-0 text-green-400" />,
    textColor: "text-green-200",
    linkClassName: "transition hover:bg-green-400/40",
  },
  success: {
    className: "border-green-400/20 bg-green-400/30",
    icon: <CheckCircleIcon className="h-5 w-5 shrink-0 text-green-400" />,
    textColor: "text-green-200",
    linkClassName: "transition hover:bg-green-400/40",
  },
  docs: {
    className: "border-blue-400/20 bg-blue-400/30",
    icon: <BookOpenIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />,
    textColor: "text-blue-200",
    linkClassName: "transition hover:bg-blue-400/40",
  },
  pending: {
    className: "border-blue-400/20 bg-blue-800/30",
    icon: <Spinner className="h-5 w-5 shrink-0 " />,
    textColor: "text-blue-300",
    linkClassName: "transition hover:bg-blue-400/40",
  },
  pricing: {
    className: "border-indigo-400/20 bg-indigo-800/30",
    icon: <ChartBarIcon className="h-5 w-5 shrink-0 text-indigo-500" />,
    textColor: "text-indigo-200",
    linkClassName: "transition hover:bg-indigo-400/40",
  },
} as const;

export type CalloutVariant = keyof typeof variantClasses;

export function Callout({
  children,
  className,
  icon,
  cta,
  variant,
  to,
}: {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  cta?: React.ReactNode;
  variant: CalloutVariant;
  to?: string;
}) {
  const variantDefinition = variantClasses[variant];

  if (to !== undefined) {
    if (to.startsWith("http")) {
      return (
        <a
          href={to}
          target="_blank"
          className={cn(
            `flex w-full items-center justify-between gap-2.5 rounded-md border py-2 pl-2 pr-3 shadow-md backdrop-blur-sm`,
            variantDefinition.className,
            variantDefinition.linkClassName,
            className
          )}
        >
          <div className={"flex w-full items-center gap-x-2"}>
            {icon ? icon : variantDefinition.icon}

            {typeof children === "string" ? (
              <Paragraph variant={"small"} className={variantDefinition.textColor}>
                {children}
              </Paragraph>
            ) : (
              children
            )}
          </div>
          <ArrowTopRightOnSquareIcon className={cn("h-5 w-5", variantDefinition.textColor)} />
        </a>
      );
    } else {
      return (
        <Link
          to={to}
          className={cn(
            `flex w-full items-start justify-between gap-2.5 rounded-md border py-2 pl-2 pr-3 shadow-md backdrop-blur-sm`,
            variantDefinition.className,
            variantDefinition.linkClassName,
            className
          )}
        >
          <div className={"flex w-full items-start gap-x-2"}>
            {icon ? icon : variantDefinition.icon}

            {typeof children === "string" ? (
              <Paragraph variant={"small"} className={variantDefinition.textColor}>
                {children}
              </Paragraph>
            ) : (
              children
            )}
          </div>
          <ChevronRightIcon className={cn("h-5 w-5", variantDefinition.textColor)} />
        </Link>
      );
    }
  }

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-md border pl-2 pr-2 shadow-md backdrop-blur-sm",
        cta ? "py-2" : "py-2.5",
        variantDefinition.className,
        className
      )}
    >
      <div className={cn(`flex w-full items-center gap-2.5`)}>
        {icon ? icon : variantDefinition.icon}

        {typeof children === "string" ? (
          <Paragraph variant={"small"} className={variantDefinition.textColor}>
            {children}
          </Paragraph>
        ) : (
          children
        )}
      </div>
      {cta && cta}
    </div>
  );
}
