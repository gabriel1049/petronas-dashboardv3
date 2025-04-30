import html2pdf from 'html2pdf.js';

export default function PdfExport({ targetId }) {
  const handleExport = () => {
    const element = document.getElementById(targetId);
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: 'dashboard-petronas.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .save();
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleExport}
        className="bg-petronas text-white px-4 py-2 rounded shadow hover:opacity-90"
      >
        Exportar PDF
      </button>
    </div>
  );
}
