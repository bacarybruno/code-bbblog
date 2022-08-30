import { styled } from "@linaria/react";
import { Flexbox } from "./flexbox";
import { Icon } from "./icon";

type FooterButtonProps = {
  iconName: string;
  title: string;
};

const StyledFooterButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  padding: 0 5px;
  align-items: center;
  & > i {
    color: #fff;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const FooterButton = ({ iconName, title }: FooterButtonProps) => {
  return (
    <StyledFooterButton title={title} role="button">
      <Icon name={iconName} title={title} />
    </StyledFooterButton>
  );
};

const StyledFooter = styled.footer`
  height: 22px;
  width: 100%;
  background-color: rgb(0, 122, 204);
  padding-right: 10px;
  flex: none;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Flexbox justifyContent="flex-end">
        <FooterButton iconName="smiley" title="Send a feedback" />
        <FooterButton iconName="bug" title="Report a bug" />
      </Flexbox>
    </StyledFooter>
  );
};
