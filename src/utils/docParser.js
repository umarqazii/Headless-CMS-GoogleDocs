export const parseGoogleDoc = (docData) => {
  if (!docData || !docData.body || !docData.body.content) return '';

  let htmlContent = '<div class="sop-content">'; // Wrapper for our CSS
  let inList = false;

  docData.body.content.forEach((item) => {
    if (item.paragraph) {
      const styleType = item.paragraph.paragraphStyle.namedStyleType;
      const bullet = item.paragraph.bullet;
      
      // List Handling
      if (bullet && !inList) {
        htmlContent += '<ul>';
        inList = true;
      }
      if (!bullet && inList) {
        htmlContent += '</ul>';
        inList = false;
      }

      let paragraphText = item.paragraph.elements
        .map((element) => renderTextRun(element))
        .join('');

      if (!paragraphText.trim()) return;

      if (inList) {
        htmlContent += `<li>${paragraphText}</li>`;
      } else if (styleType === 'HEADING_1') {
        htmlContent += `<h1>${paragraphText}</h1>`;
      } else if (styleType === 'HEADING_2') {
        htmlContent += `<h2>${paragraphText}</h2>`;
      } else if (styleType === 'HEADING_3') {
        htmlContent += `<h3>${paragraphText}</h3>`;
      } else {
        htmlContent += `<p>${paragraphText}</p>`;
      }
    }
  });

  if (inList) htmlContent += '</ul>';
  htmlContent += '</div>';
  return htmlContent;
};

const renderTextRun = (element) => {
  const textRun = element.textRun;
  if (!textRun || !textRun.content) return '';

  let text = textRun.content;
  const style = textRun.textStyle;

  if (style.link && style.link.url) {
    text = `<a href="${style.link.url}" target="_blank">${text}</a>`;
  }

  if (style.bold) text = `<strong>${text}</strong>`;
  if (style.italic) text = `<em>${text}</em>`;
  if (style.underline && !style.link) text = `<u>${text}</u>`;

  text = text.replace(/\n/g, ''); 
  return text;
};