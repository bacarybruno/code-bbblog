import { Flexbox } from '../flexbox';
import { Codicon } from '../icon';
import * as SC from './styles';

type FooterButtonProps = {
  iconName: string;
  title: string;
};

const FooterButton = ({ iconName, title }: FooterButtonProps) => {
  return (
    <SC.FooterButton title={title} role="button">
      <Codicon name={iconName} title={title} />
    </SC.FooterButton>
  );
};

export const Footer = () => {
  return (
    <SC.Footer>
      <Flexbox justifyContent="flex-end">
        <FooterButton iconName="smiley" title="Send a feedback" />
        <FooterButton iconName="bug" title="Report a bug" />
      </Flexbox>
    </SC.Footer>
  );
};
