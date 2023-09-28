import { useMemo } from "react";
import { ProjectScan } from "../types/projectScan";

export const useProjectScanStats = (projectScan?: ProjectScan) => {
  const stats = useMemo(() => {
    if (!projectScan || !projectScan.output || !projectScan.output.providers) {
      return {
        low: null,
        medium: null,
        high: null,
      }
    }
    const stats = {
      low: 0,
      medium: 0,
      high: 0,
    };
    const { providers } = projectScan.output;
    providers.forEach(p => {
      p.result.items.forEach(item => {
        if (['LOW', 'OPTIMIZATION', 'INFORMATIONAL'].includes(item.impact)) {
          stats.low++;
        } else if (item.impact === 'MEDIUM') {
          stats.medium++;
        } else if (item.impact === 'HIGH') {
          stats.high++;
        }
      });
    })
    return stats;
  }, [projectScan]);

  return stats;
}