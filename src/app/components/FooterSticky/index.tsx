import { Container, SupportSection } from './style';
import { ReactComponent as ConnectIcon } from 'app/assets/img/connect.svg';
import { ReactComponent as DownloadIcon } from 'app/assets/img/download.svg';
import { ReactComponent as DocsIcon } from 'app/assets/img/docs.svg';
import { useTranslation } from 'react-i18next';

const FooterSticky = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <ConnectIcon className="connect-icon" />
        <span className="connect-title">{t('connection')}</span>
      </div>
      <SupportSection>
        <div className="d-flex download-section">
          <DownloadIcon className="download-icon" />
          <span className="download-title">{t('download')}</span>
        </div>
        <div className="d-flex online-section">
          <DocsIcon className="docs-icon" />
          <span className="docs-title">{t('online-support')}</span>
        </div>
      </SupportSection>
    </Container>
  );
};
export default FooterSticky;
