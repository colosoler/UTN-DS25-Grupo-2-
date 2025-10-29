
import { ReportModel } from './ReportModel';
import { Vote } from './Vote';
import { ShareButton } from './ShareButton';
import { OptionsDropdown } from './OptionsDropdown';

    export const Buttons = ({ material, user }) => {
        return (
            <>
                <article className="buttons">
                    <div className='row align-items-center'>
                        <div className='col'>
                        <Vote material={material} />
                        </div>
                        <div id="report" className='col'>
                            <ReportModel materialId={material.id}/>
                        </div>
                        <div className='col'>
                        <ShareButton shareUrl={`${window.location.origin}/material/${material?.id}`} />
                        </div>
                        {user?.id === material?.userId && (
                            <div id="options" className='col'>
                                <OptionsDropdown material={material} />
                            </div>
                        )}
                    </div>
                </article>
            </>
        );
};