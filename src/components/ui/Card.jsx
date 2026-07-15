export function Card({ children, className = "", ...props }) {
  return (
    <div className={`card-custom ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`card-custom-header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }) {
  return (
    <div className={`card-custom-body ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`card-custom-title ${className}`}>{children}</h3>;
}
