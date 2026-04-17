
import { ReportModel } from './ReportModel';
import { Vote } from './Vote';
import { ShareButton } from './ShareButton';
import { FavsButton } from './FavsButton';
import { OptionsDropdown } from './OptionsDropdown';
import { Download } from 'lucide-react';

export const Buttons = ({ material, user }) => {
  const isOwner = user?.id === material?.userId;

const handleDownload = async () => {
    if (!material?.archivo) return;

    const fileName = material.titulo
      ? `${material.titulo}`.replace(/[^a-z0-9\.\-_]/gi, '_') + '.pdf'
      : 'material.pdf';

    try {
      const response = await fetch(material.archivo, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('No se pudo obtener el archivo para descargar');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error descargando el archivo:', err);
      window.open(material.archivo, '_blank');
    }
        };

        return (
            <>
                <article className="buttons">
                    <div className='row align-items-center'>
                        <div className='col'>
                        <Vote material={material} />
                        </div>
                        {!isOwner &&(
                        <div id="report" className='col'>
                            <ReportModel materialId={material.id}/>
                        </div>
                        )}
                        <div className='col'>
                        <ShareButton shareUrl={`${window.location.origin}/material/${material?.id}`} />
                        </div>
                        <div className='col'>
                        <FavsButton materialId={material?.id} />
                        </div>
                        {material?.archivo && (
                        <div id="download" className='col'>
                            <div onClick={handleDownload} style={{ cursor: 'pointer' }} title="Descargar archivo">
                                <Download size={24} />
                            </div>
                        </div>
                        )}
                        {isOwner && (
                            <div id="options" className='col'>
                                <OptionsDropdown material={material} />
                            </div>
                        )}
                    </div>
                </article>
            </>
        );
};