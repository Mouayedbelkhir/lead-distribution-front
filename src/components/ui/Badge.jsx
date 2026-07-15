export function Badge({ children, variant = "default", icon: Icon, className = "" }) {
  const classes = ["badge-ui", `badge-ui-${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}
