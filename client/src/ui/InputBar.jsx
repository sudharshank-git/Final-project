export default function InputBar(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className="search-input-bar"
    />
  );
}
