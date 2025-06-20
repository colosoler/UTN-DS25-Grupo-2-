import './styles/Buttons.css';
import ReportModel from './ReportModel';
import { Vote } from './Vote';
import { Share } from './Share';
import { OptionsDropdown } from './OptionsDropdown';

export const Buttons = ({ result, shareUrl }) => {
    return (
        <>
            <article className="buttons">
                <Vote result={result} />
                <div id="report">
                    <ReportModel />
                </div>
                <Share shareUrl={shareUrl} />
                <div id="options">
                    <OptionsDropdown result={result} />
                </div>
            </article>
        </>
    );
};