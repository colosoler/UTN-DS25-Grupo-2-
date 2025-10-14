import './styles/Buttons.css';
import ReportModel from './ReportModel';
import { Vote } from './Vote';
import { Share } from './Share';
import { OptionsDropdown } from './OptionsDropdown';

    export const Buttons = ({ material, user }) => {
        return (
            <>
                <article className="buttons">
                    <Vote material={material} />
                    <div id="report">
                        <ReportModel />
                    </div>
                    <Share shareUrl={`${window.location.origin}/material/${material.id}`}/>
                    {(user.id === material.userId) && (
                        <div id="options">
                            <OptionsDropdown material={material} />
                        </div>
                    )}
                </article>
            </>
        );
};