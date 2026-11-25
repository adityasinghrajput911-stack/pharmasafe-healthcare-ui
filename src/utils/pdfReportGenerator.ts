import { jsPDF } from 'jspdf';
import type { MultiMedicineAnalysisResult, InteractionAnalysis } from '../types';
import { getTrafficLightDietGuide } from '../data/trafficLightDietGuide';

/**
 * Generates and downloads a print-ready A4 PDF document containing the
 * analyzed medication interaction summary and daily schedule.
 */
export function downloadMedicationReportPdf(analysis: MultiMedicineAnalysisResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 16;
    }
  };

  // =========================================================================
  // 1. HEADER BANNER
  // =========================================================================
  doc.setFillColor(15, 118, 110); // Teal-700 (#0F766E)
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('PharmaSafe Clinical Safety & Schedule Report', margin + 6, y + 9.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    'Multi-Medicine Interaction Summary & Personalized Daily Timetable',
    margin + 6,
    y + 15.5
  );

  const dateStr = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  doc.setFontSize(8.5);
  doc.text(`Generated: ${dateStr}`, margin + 6, y + 21);

  y += 30;

  // =========================================================================
  // 2. OVERALL STATUS BANNER
  // =========================================================================
  const isCritical = analysis.maxSeverity === 'CRITICAL';
  const isModerate = analysis.maxSeverity === 'MODERATE';

  if (isCritical) {
    doc.setFillColor(254, 242, 242); // Rose-50
    doc.setDrawColor(225, 29, 72); // Rose-600
  } else if (isModerate) {
    doc.setFillColor(255, 251, 235); // Amber-50
    doc.setDrawColor(217, 119, 6); // Amber-600
  } else {
    doc.setFillColor(236, 253, 245); // Emerald-50
    doc.setDrawColor(5, 150, 105); // Emerald-600
  }

  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 18, 2.5, 2.5, 'FD');

  if (isCritical) {
    doc.setTextColor(153, 27, 27);
  } else if (isModerate) {
    doc.setTextColor(146, 64, 14);
  } else {
    doc.setTextColor(6, 95, 70);
  }

  const statusHeading = isCritical
    ? `CRITICAL DRUG CLASH DETECTED (${analysis.totalClashes} WARNING${analysis.totalClashes > 1 ? 'S' : ''})`
    : isModerate
    ? 'MODERATE PRECAUTION: TIMING ADJUSTMENT RECOMMENDED'
    : 'SAFE COMBINATION: NO MAJOR CLASHES DETECTED';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(statusHeading, margin + 5, y + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const headlineLines = doc.splitTextToSize(analysis.overallHeadline, contentWidth - 10);
  doc.text(headlineLines[0] || '', margin + 5, y + 13.5);

  y += 24;

  // =========================================================================
  // 3. EVALUATED MEDICATIONS LIST
  // =========================================================================
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    `Evaluated Medications (${analysis.analyzedPills.length})`,
    margin,
    y
  );
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  analysis.analyzedPills.forEach((pill, index) => {
    checkPageBreak(12);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 9.5, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    const pillTitle = `${index + 1}. ${pill.brandName}${pill.popularDose ? ` (${pill.popularDose})` : ''}`;
    doc.text(pillTitle, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const saltAndCat = `${pill.genericSalt}  |  ${pill.category}`;
    const maxSaltWidth = contentWidth - 75;
    const truncatedSalt = doc.splitTextToSize(saltAndCat, maxSaltWidth)[0] || '';
    doc.text(truncatedSalt, margin + 70, y + 6);

    y += 11.5;
  });

  y += 4;

  // =========================================================================
  // 4. SECTION A: MEDICATION INTERACTION SUMMARY
  // =========================================================================
  checkPageBreak(25);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(
    `Section A: Medication Interaction Summary (${analysis.clashes.length} Alert${analysis.clashes.length === 1 ? '' : 's'})`,
    margin,
    y
  );
  y += 3.5;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  if (!analysis.hasClashes || analysis.clashes.length === 0) {
    checkPageBreak(20);
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 95, 70);
    doc.text('Safe Multi-Drug Compatibility Verified', margin + 4, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(
      'No acute pharmacokinetic clashes or competitive enzyme conflicts were detected between your selected medicines.',
      margin + 4,
      y + 12.5
    );
    y += 22;
  } else {
    analysis.clashes.forEach((clash, idx) => {
      const plainLines = doc.splitTextToSize(
        `Summary: ${clash.plainExplanation}`,
        contentWidth - 10
      );
      const whyLines = doc.splitTextToSize(
        `Mechanism: ${clash.clinicalWhy}`,
        contentWidth - 10
      );
      const fixLines = doc.splitTextToSize(
        `Actionable Fix: ${clash.actionableFix}`,
        contentWidth - 10
      );

      const boxHeight =
        16 +
        plainLines.length * 4.2 +
        whyLines.length * 4 +
        fixLines.length * 4.2 +
        6;

      checkPageBreak(boxHeight + 4);

      if (clash.severity === 'CRITICAL') {
        doc.setFillColor(255, 241, 242); // Rose-50
        doc.setDrawColor(251, 113, 133); // Rose-400
      } else {
        doc.setFillColor(254, 252, 232); // Amber-50
        doc.setDrawColor(251, 191, 36); // Amber-400
      }

      doc.setLineWidth(0.4);
      doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

      let cy = y + 6;

      // Pair & severity
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(clash.severity === 'CRITICAL' ? 159 : 146, clash.severity === 'CRITICAL' ? 18 : 64, clash.severity === 'CRITICAL' ? 57 : 14);
      doc.text(
        `${idx + 1}. [${clash.severity}] ${clash.drugA}  +  ${clash.drugB}`,
        margin + 4,
        cy
      );
      cy += 5.5;

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(clash.title, margin + 4, cy);
      cy += 5;

      // Plain Explanation
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(30, 41, 59);
      doc.text(plainLines, margin + 4, cy);
      cy += plainLines.length * 4.2 + 1.5;

      // Clinical Why
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.3);
      doc.setTextColor(71, 85, 105);
      doc.text(whyLines, margin + 4, cy);
      cy += whyLines.length * 4 + 1.5;

      // Actionable Fix
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 118, 110);
      doc.text(fixLines, margin + 4, cy);

      y += boxHeight + 4;
    });
    y += 2;
  }

  // =========================================================================
  // 5. SECTION B: DAILY MEDICATION SCHEDULE (TIMETABLE)
  // =========================================================================
  checkPageBreak(30);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Section B: Personalized Daily Medication Schedule', margin, y);
  y += 3.5;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  analysis.schedule.forEach((slot) => {
    checkPageBreak(24);

    // Slot Header Bar
    doc.setFillColor(241, 245, 249); // Slate-100
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${slot.period.toUpperCase()}  —  ${slot.subtitle}`, margin + 4, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 118, 110);
    doc.text(slot.timingWindow, margin + contentWidth - 4, y + 6, {
      align: 'right',
    });

    y += 11;

    if (slot.pills.length === 0) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(
        'No medications scheduled in this window.',
        margin + 5,
        y + 4
      );
      y += 8;
    } else {
      slot.pills.forEach((scheduled) => {
        const directionLines = doc.splitTextToSize(
          `Directions: ${scheduled.timingNote}`,
          contentWidth - 12
        );
        const sepLines = scheduled.isSeparatedDueToClash
          ? doc.splitTextToSize(
              `Spacing Note: ${scheduled.separationReason || 'Separated to prevent chemical overlap'}`,
              contentWidth - 12
            )
          : [];

        const itemHeight =
          12 +
          directionLines.length * 4 +
          (sepLines.length > 0 ? sepLines.length * 4 + 2 : 0);

        checkPageBreak(itemHeight + 3);

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin + 2, y, contentWidth - 4, itemHeight, 1.5, 1.5, 'FD');

        let py = y + 5.5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        const doseLabel = scheduled.pill.popularDose || scheduled.pill.category;
        doc.text(
          `• ${scheduled.pill.brandName} (${doseLabel}) — ${scheduled.pill.genericSalt}`,
          margin + 5,
          py
        );
        py += 4.8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        doc.text(directionLines, margin + 7, py);
        py += directionLines.length * 4;

        if (sepLines.length > 0) {
          py += 1;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.2);
          doc.setTextColor(180, 83, 9); // Amber-700
          doc.text(sepLines, margin + 7, py);
        }

        y += itemHeight + 2.5;
      });
      y += 2;
    }
  });

  // =========================================================================
  // 6. CLINICAL DISCLAIMER & EMERGENCY FOOTER
  // =========================================================================
  checkPageBreak(26);
  y += 3;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28);
  doc.text(
    'Emergency Helplines (India): National Emergency: 112  |  AIIMS Poison Control: 1800-116-117 (Toll-Free)',
    margin + 4,
    y + 6
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(100, 116, 139);
  const disclaimerText =
    'Clinical Disclaimer: PharmaSafe generates interaction summaries and schedule recommendations synthesized from clinical pharmacology monographs for patient and caregiver education. Always consult your prescribing doctor or pharmacist before altering any prescribed medication schedule.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 8);
  doc.text(disclaimerLines, margin + 4, y + 11.5);

  // Save PDF file
  const safeFilename = `PharmaSafe_Medication_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(safeFilename);
}

/**
 * Generates and downloads a print-ready A4 PDF document for a single
 * drug-food clinical assessment card.
 */
export function downloadSingleAssessmentReportPdf(analysis: InteractionAnalysis): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Header
  doc.setFillColor(15, 118, 110);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('PharmaSafe Drug-Food Interaction Report', margin + 6, y + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    `Evaluated Pair: ${analysis.drug} + ${analysis.food}`,
    margin + 6,
    y + 16
  );
  y += 28;

  // Severity & Headline
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Safety Status: ${analysis.severity || analysis.status || 'SAFE'}`, margin, y);
  y += 6;

  doc.setFontSize(12);
  const headlineLines = doc.splitTextToSize(analysis.headline || 'Safety Evaluation Complete', contentWidth);
  doc.text(headlineLines, margin, y);
  y += headlineLines.length * 5.5 + 4;

  // Mechanism
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Pharmacological Mechanism:', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const mechLines = doc.splitTextToSize(
    analysis.mechanismExplanation || 'No critical chemical conflict detected.',
    contentWidth
  );
  doc.text(mechLines, margin, y);
  y += mechLines.length * 4.5 + 5;

  // Schedule & Timing Rule
  const dosageRules =
    analysis.patientGuidance?.dosageAndTimingRules ||
    'Take medication as directed by your prescribing physician with a full glass of water.';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Daily Schedule & Timing Guidance:', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const ruleLines = doc.splitTextToSize(dosageRules, contentWidth);
  doc.text(ruleLines, margin, y);
  y += ruleLines.length * 4.5 + 6;

  // Traffic Light Diet Guide summary
  const dietGuide = getTrafficLightDietGuide(analysis.drug, (analysis as any)?.brandName);
  if (dietGuide) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Traffic Light Diet Guide Summary:', margin, y);
    y += 6;

    const zones = [
      { label: 'Strictly Avoid (Red Zone)', data: dietGuide.redZone },
      { label: 'Space Out (Amber Zone)', data: dietGuide.amberZone },
      { label: 'Safe to Enjoy (Green Zone)', data: dietGuide.greenZone },
    ];

    zones.forEach((zone) => {
      if (!zone.data) return;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(`• ${zone.label}: ${zone.data.title}`, margin + 2, y);
      y += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const foodsStr = (zone.data.foods || []).map((f) => f.name).join(', ');
      const foodLines = doc.splitTextToSize(`Foods: ${foodsStr}`, contentWidth - 6);
      doc.text(foodLines, margin + 5, y);
      y += foodLines.length * 4 + 1;
      const reasonLines = doc.splitTextToSize(`Guidance: ${zone.data.reasonWhy}`, contentWidth - 6);
      doc.text(reasonLines, margin + 5, y);
      y += reasonLines.length * 4 + 4;
    });
  }

  doc.save(`PharmaSafe_Assessment_${new Date().toISOString().slice(0, 10)}.pdf`);
}
