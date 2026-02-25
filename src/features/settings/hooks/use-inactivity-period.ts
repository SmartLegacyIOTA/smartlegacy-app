import { useCallback, useState } from "react";
import { router } from "expo-router";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

export interface PeriodOption {
  value: number;
  labelKey: string;
}

export const PERIOD_OPTIONS: PeriodOption[] = [
  { value: 30, labelKey: "inactivityPeriod.option30" },
  { value: 90, labelKey: "inactivityPeriod.option90" },
  { value: 180, labelKey: "inactivityPeriod.option180" },
  { value: 365, labelKey: "inactivityPeriod.option365" },
];

export function useInactivityPeriod(initialDays: number) {
  const { t } = useI18nService();
  const [selectedDays, setSelectedDays] = useState(initialDays);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSelectPeriod = useCallback(
    (days: number) => {
      setSelectedDays(days);
      setHasChanges(days !== initialDays);
    },
    [initialDays],
  );

  const handleSave = useCallback(() => {
    if (!hasChanges) return;

    // TODO: Save to backend/storage
    console.log("Saving inactivity period:", selectedDays);

    // TODO: Update the value in the parent screen (use global state or callback)

    // Navigate back
    router.back();
  }, [hasChanges, selectedDays]);

  const getOptionLabel = useCallback(
    (labelKey: string) => {
      return t(labelKey);
    },
    [t],
  );

  const getAccessibilityLabel = useCallback(
    (labelKey: string, isSelected: boolean) => {
      const days = t(labelKey);
      const selectedStatus = isSelected
        ? t("inactivityPeriod.a11ySelected")
        : t("inactivityPeriod.a11yNotSelected");
      return t("inactivityPeriod.a11yOption", {
        days,
        selected: selectedStatus,
      });
    },
    [t],
  );

  return {
    selectedDays,
    hasChanges,
    handleSelectPeriod,
    handleSave,
    getOptionLabel,
    getAccessibilityLabel,
  };
}
