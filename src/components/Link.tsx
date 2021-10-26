type Props = {
    url: string;
}

const Link = (props: Props) => {
  if (props.url==="") {
    return (<div/>)
  }else{
    return (
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.url}>
              View Cat!!!
          </a>
        </div>
      )
  };
}
export default Link;
