"use client";

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  iconSize,
  type = "button",
  className = "",
  ...props
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "sm" ? "btn-sm" : "",
    size === "lg" ? "btn-lg" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" />
          {children}
        </>
      ) : (
        <>
          {Icon && <Icon size={iconSize || (size === "sm" ? 14 : 16)} className="me-1" />}
          {children}
        </>
      )}
    </button>
  );
}
