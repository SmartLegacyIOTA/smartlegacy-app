/**
 * Accessibility Examples
 *
 * This file demonstrates how to properly use accessibility features
 * in the Smart Legacy app components.
 */

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SharedButton } from "./shared-button";
import { SharedInput } from "./shared-input";
import { SharedText } from "./shared-text";
import { SharedAvatar } from "./shared-avatar";
import { Icon } from "@/src/components/ui/icon";

// ============================================================================
// BUTTONS
// ============================================================================

export function ButtonAccessibilityExamples() {
  return (
    <View style={styles.container}>
      {/* Basic Button with Accessibility */}
      <SharedButton
        onPress={() => {}}
        accessibilityLabel="Submit form"
        accessibilityHint="Submits your guardian information securely"
      >
        Submit
      </SharedButton>

      {/* Button with Icon */}
      <SharedButton
        onPress={() => {}}
        leftIcon={
          <Icon
            variant="material-community"
            name="check"
            size={20}
            color="#fff"
          />
        }
        accessibilityLabel="Confirm action"
        accessibilityHint="Confirms and saves your changes"
      >
        Confirm
      </SharedButton>

      {/* Loading Button - Automatically announces "loading" */}
      <SharedButton
        onPress={() => {}}
        loading={true}
        accessibilityLabel="Save"
        // Will be announced as "Save, loading"
      >
        Save
      </SharedButton>

      {/* Disabled Button */}
      <SharedButton
        onPress={() => {}}
        disabled={true}
        accessibilityLabel="Complete profile"
        accessibilityHint="Button disabled. Please fill all required fields first"
      >
        Complete Profile
      </SharedButton>
    </View>
  );
}

// ============================================================================
// INPUTS
// ============================================================================

export function InputAccessibilityExamples() {
  const [email, setEmail] = React.useState("");
  const [hasError, setHasError] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Basic Input with Accessibility */}
      <SharedInput
        label="Email Address"
        placeholder="your@email.com"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email address input field"
        accessibilityHint="Enter your email address for account verification"
      />

      {/* Input with Helper Text */}
      <SharedInput
        label="Recovery Email"
        placeholder="guardian@example.com"
        helperText="This email will be used for account recovery"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Recovery email address"
        // accessibilityHint automatically uses helperText
      />

      {/* Input with Error - Error is automatically announced */}
      <SharedInput
        label="Password"
        placeholder="Enter password"
        error={hasError}
        errorMessage="Password must be at least 8 characters"
        secureTextEntry
        accessibilityLabel="Password input field"
        // Error message replaces hint when error is true
      />

      {/* Financial Input */}
      <SharedInput
        label="Amount"
        placeholder="0.00"
        keyboardType="decimal-pad"
        accessibilityLabel="Amount in dollars"
        accessibilityHint="Enter the amount you want to transfer"
      />
    </View>
  );
}

// ============================================================================
// AVATARS
// ============================================================================

export function AvatarAccessibilityExamples() {
  return (
    <View style={styles.container}>
      {/* Avatar with Initials */}
      <SharedAvatar
        variant="text"
        text="JD"
        size="medium"
        accessibilityLabel="User avatar with initials J D"
      />

      {/* Avatar with Icon */}
      <SharedAvatar
        variant="icon"
        iconName="shield-check"
        size="large"
        accessibilityLabel="Verified guardian badge"
      />

      {/* Guardian Avatar */}
      <SharedAvatar
        variant="text"
        text="SE"
        size="medium"
        accessibilityLabel="Guardian avatar: Sarah Ellis"
      />
    </View>
  );
}

// ============================================================================
// TEXT
// ============================================================================

export function TextAccessibilityExamples() {
  return (
    <View style={styles.container}>
      {/* Headers - Automatically get accessibilityRole="header" */}
      <SharedText variant="h1">Dashboard</SharedText>

      {/* Financial Information - Custom label for screen readers */}
      <SharedText
        variant="h1"
        accessibilityLabel="Balance: twelve thousand four hundred fifty dollars"
      >
        $12,450.00
      </SharedText>

      {/* Time-sensitive Information */}
      <SharedText
        variant="caption"
        accessibilityLabel="Last updated 2 minutes ago"
      >
        2m ago
      </SharedText>

      {/* Status Information */}
      <SharedText
        variant="label"
        accessibilityLabel="Guardian status: verified and active"
      >
        Verified
      </SharedText>
    </View>
  );
}

// ============================================================================
// TOUCHABLE ELEMENTS
// ============================================================================

export function TouchableAccessibilityExamples() {
  return (
    <View style={styles.container}>
      {/* Icon-only Button */}
      <TouchableOpacity
        onPress={() => {}}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        accessibilityHint="View your notifications"
      >
        <Icon variant="material-community" name="bell" size={24} color="#000" />
      </TouchableOpacity>

      {/* Copy Button */}
      <TouchableOpacity
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Copy DID"
        accessibilityHint="Copies your decentralized identity to clipboard"
      >
        <Icon
          variant="material-community"
          name="content-copy"
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* Navigation Link */}
      <TouchableOpacity
        onPress={() => {}}
        accessibilityRole="link"
        accessibilityLabel="View guardian details"
        accessibilityHint="Opens guardian profile screen"
      >
        <SharedText variant="body" color="slAccent">
          View Details
        </SharedText>
      </TouchableOpacity>

      {/* Card with Action */}
      <TouchableOpacity
        onPress={() => {}}
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Guardian: Sarah Ellis, Status: Verified"
        accessibilityHint="Tap to view guardian details and manage permissions"
      >
        <SharedText variant="label">Sarah Ellis</SharedText>
        <SharedText variant="caption">Verified</SharedText>
      </TouchableOpacity>
    </View>
  );
}

// ============================================================================
// LISTS AND GROUPS
// ============================================================================

export function ListAccessibilityExamples() {
  const activities = [
    { id: "1", title: "Guardian added", timestamp: "2 days ago" },
    { id: "2", title: "Vault created", timestamp: "3 days ago" },
  ];

  return (
    <View
      accessible={true}
      accessibilityRole="list"
      accessibilityLabel="Recent activities"
    >
      {activities.map((activity, index) => (
        <View
          key={activity.id}
          accessible={true}
          accessibilityLabel={`Activity ${index + 1} of ${activities.length}: ${activity.title}, ${activity.timestamp}`}
        >
          <SharedText variant="body">{activity.title}</SharedText>
          <SharedText variant="caption">{activity.timestamp}</SharedText>
        </View>
      ))}
    </View>
  );
}

// ============================================================================
// STATES AND FEEDBACK
// ============================================================================

export function StateAccessibilityExamples() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Loading State */}
      <View
        accessible={true}
        accessibilityLabel={isLoading ? "Loading data" : "Data loaded"}
        accessibilityState={{ busy: isLoading }}
      >
        <SharedText variant="body">
          {isLoading ? "Loading..." : "Ready"}
        </SharedText>
      </View>

      {/* Selected State */}
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        accessibilityRole="checkbox"
        accessibilityLabel="Accept terms and conditions"
        accessibilityState={{ checked: isSelected }}
      >
        <SharedText variant="body">
          {isSelected ? "✓" : "○"} Accept Terms
        </SharedText>
      </TouchableOpacity>

      {/* Disabled State */}
      <TouchableOpacity
        disabled={true}
        accessibilityRole="button"
        accessibilityLabel="Continue"
        accessibilityHint="Button disabled. Complete all fields to continue"
        accessibilityState={{ disabled: true }}
      >
        <SharedText variant="body">Continue</SharedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
});

/**
 * TESTING CHECKLIST
 *
 * iOS - VoiceOver:
 * □ Enable: Settings → Accessibility → VoiceOver
 * □ Navigate: Swipe right/left
 * □ Activate: Double-tap
 * □ Check all labels are descriptive
 * □ Check all hints are helpful
 * □ Check states are announced
 *
 * Android - TalkBack:
 * □ Enable: Settings → Accessibility → TalkBack
 * □ Navigate: Swipe right/left
 * □ Activate: Double-tap
 * □ Check all labels are descriptive
 * □ Check all hints are helpful
 * □ Check states are announced
 *
 * General:
 * □ All touch targets minimum 44x44 points
 * □ Financial amounts are readable
 * □ Error messages are clear
 * □ Loading states are announced
 * □ Forms can be completed with screen reader
 */
