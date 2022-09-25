import * as SC from './styles';

export const Comments = () => {
  const createScript = (anchor: HTMLDivElement) => {
    if (!anchor) return;
    const script = document.createElement('script');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'bacarybruno/code-bbblog');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('theme', 'github-dark');
    anchor.replaceChildren(script);
  };

  return (
    <SC.Wrapper>
      <div ref={createScript} />
    </SC.Wrapper>
  );
};
