import './styles/Buttons.css';
import { MdShare, MdMoreHoriz } from 'react-icons/md';
import ReportModel from './ReportModel';
import {Vote} from './Vote';

export const Buttons = ({result}) => {
  return (
    <>
    <article className='buttons'>
        <Vote result={result}/>
        <div id='report'>
            <ReportModel />
        </div>
        <div id='share'>
          <MdShare />
        </div>
        <div id='options'>
            <MdMoreHoriz />
        </div>
    </article>
    </>
  )
}
