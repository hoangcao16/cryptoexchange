import { ReactComponent as PrevIcon } from 'app/assets/img/prev.svg';
import { ReactComponent as NextIcon } from 'app/assets/img/next.svg';

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <PrevIcon />
      </div>
    </>
  );
}
export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <NextIcon />
      </div>
    </>
  );
}
