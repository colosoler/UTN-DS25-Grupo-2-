import './styles/Buttons.css';
import { MdMoreHoriz } from 'react-icons/md';
import ReportModel from './ReportModel';
import { Vote } from './Vote';
import {Share} from './Share';

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
                    <MdMoreHoriz />
                </div>
            </article>
        </>
    );
};
