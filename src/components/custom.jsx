import '../sass/custom.scss';
import icon_start from '../emojis/1f352.png';
import icon_end from '../emojis/1f347.png';
export function CopyRight() {
    return (
        <div className="copyright">
            <span><img src={icon_start} /> Zip Alvelous</span>
            <span><img src={icon_end} /> file.ourfor.top</span>
        </div>
    );
}