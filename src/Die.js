export default function Die(props) {
  return (
    <div>
      <h2
        className={props.ishold ? 'die--back' : 'die--face'}
        onClick={props.holddice}
        id={props.id}
        ishold={props.ishold.toString()}
      >
        {props.value}
      </h2>
    </div>
  );
}
