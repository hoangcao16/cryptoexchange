import { Container, SupportSection } from './style';
import { ReactComponent as ConnectIcon } from 'app/assets/img/connect.svg';
import { ReactComponent as DownloadIcon } from 'app/assets/img/download.svg';
import { ReactComponent as DocsIcon } from 'app/assets/img/docs.svg';
const FooterSticky = () => {
  return (
    <Container>
      <div>
        <ConnectIcon className="connect-icon" />
        <span className="connect-title">Connection</span>
      </div>
      <SupportSection>
        <div className="d-flex download-section">
          <DownloadIcon className="download-icon" />
          <span className="download-title">Download</span>
        </div>
        <div className="d-flex online-section">
          <DocsIcon className="docs-icon" />
          <span className="docs-title">Online Support</span>
        </div>
      </SupportSection>
    </Container>
  );
};
export default FooterSticky;
