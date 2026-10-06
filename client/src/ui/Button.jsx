import Badge from "./Badge";

export default function Button({ children, badge, onClick, id,className, type = "button" }) {
  return (
    <button type={type} className={`btn btn-secondary ${className}`} onClick={onClick} id={id}>
      {children}
      {badge ? <Badge>{badge}</Badge> : null}
    </button>
  );
}
