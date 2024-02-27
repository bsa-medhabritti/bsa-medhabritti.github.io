jQuery(document).ready(function () {

  //using html2pdf and jsPDF
  $("#generatePdf").click(function () {
    
    const element = document.getElementById('result');

    // print options
    const options = {
      margin: 30,
      filename: 'admit-card.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {scale: 2, letterRedering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  });
});
