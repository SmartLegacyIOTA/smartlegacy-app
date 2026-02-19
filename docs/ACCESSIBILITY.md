# Accessibility Guidelines

This document outlines the accessibility standards and best practices for the Smart Legacy app.

## Why Accessibility Matters

As a fintech application, we must ensure our app is usable by everyone, including:
- Users with visual impairments (using screen readers like VoiceOver/TalkBack)
- Users with motor impairments (requiring larger touch targets)
- Users with cognitive disabilities (requiring clear, simple language)
- Users in varied environments (high contrast, outdoor usage)

## Standards We Follow

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **iOS Human Interface Guidelines** - Apple's accessibility standards
- **Android Material Design** - Google's accessibility standards

## Component Accessibility

### SharedButton

All buttons have:
- `accessibilityRole="button"` - Identifies as a button
- `accessibilityLabel` - Describes the button's purpose
- `accessibilityHint` - Explains what happens when pressed
- `accessibilityState` - Indicates disabled/loading state
- Minimum touch target: 44x44 points

```typescript
<SharedButton
    onPress={handleSubmit}
    accessibilityLabel="Submit form"
    accessibilityHint="Submits your guardian information"
>
    Submit
</SharedButton>
```

### SharedInput

All inputs have:
- `accessibilityLabel` - Describes the input field
- `accessibilityHint` - Provides guidance (from helperText)
- Error states are announced via label changes

```typescript
<SharedInput
    label="Email"
    placeholder="Enter email"
    helperText="We'll verify this securely"
    accessibilityLabel="Email address input"
    accessibilityHint="Enter your guardian's email address"
/>
```

### SharedAvatar

All avatars have:
- `accessibilityRole="image"` - Identifies as an image
- `accessibilityLabel` - Describes the avatar content

```typescript
<SharedAvatar
    variant="text"
    text="JD"
    accessibilityLabel="User avatar with initials J D"
/>
```

### SharedText

Headers automatically get `accessibilityRole="header"`:

```typescript
<SharedText variant="h1">
    Dashboard
</SharedText>
```

## Best Practices

### 1. Touch Targets

All interactive elements should be at least **44x44 points**:

```typescript
const styles = StyleSheet.create({
    button: {
        minHeight: 44,
        minWidth: 44
    }
});
```

### 2. Labels and Hints

**Labels** describe what something is:
- "Submit button"
- "Email input field"
- "Navigation back button"

**Hints** describe what will happen:
- "Submits your form"
- "Opens the settings screen"
- "Returns to previous screen"

```typescript
<TouchableOpacity
    accessibilityLabel="Settings"
    accessibilityHint="Opens settings screen"
>
    <Icon name="settings" />
</TouchableOpacity>
```

### 3. Loading States

Always announce loading states:

```typescript
const loadingLabel = loading ? `${label}, loading` : label;

<TouchableOpacity
    accessibilityLabel={loadingLabel}
    accessibilityState={{ busy: loading }}
>
```

### 4. Financial Information

Format currency for screen readers:

```typescript
// Visual: "$12,450.00"
// Screen reader: "12450 dollars"

<SharedText
    accessibilityLabel="Balance: twelve thousand four hundred fifty dollars"
>
    $12,450.00
</SharedText>
```

### 5. Form Validation

Error messages should be clear and actionable:

```typescript
<SharedInput
    error={true}
    errorMessage="Email is required. Please enter your email address."
    // Screen reader will announce the error
/>
```

### 6. Navigation

Use semantic navigation:

```typescript
<TouchableOpacity
    accessibilityRole="link"
    accessibilityLabel="View guardian details"
    accessibilityHint="Opens guardian profile screen"
>
```

### 7. Lists

Group related items:

```typescript
<View
    accessible={true}
    accessibilityRole="list"
    accessibilityLabel="Recent activities"
>
    {activities.map((activity) => (
        <View
            key={activity.id}
            accessible={true}
            accessibilityLabel={`${activity.title}, ${activity.timestamp}`}
        >
```

### 8. Images

All images need descriptions:

```typescript
<Image
    source={logo}
    accessibilityLabel="Smart Legacy app logo"
    accessibilityIgnoresInvertColors={true} // Prevents color inversion
/>
```

## Testing

### iOS - VoiceOver

1. Settings → Accessibility → VoiceOver → On
2. Triple-click home/side button to toggle
3. Swipe right/left to navigate
4. Double-tap to activate

### Android - TalkBack

1. Settings → Accessibility → TalkBack → On
2. Swipe right/left to navigate
3. Double-tap to activate

### Test Checklist

- [ ] All interactive elements have labels
- [ ] All inputs have labels and hints
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] All touch targets are 44x44 minimum
- [ ] Navigate entire app with screen reader
- [ ] All forms can be completed with screen reader
- [ ] Currency amounts are readable
- [ ] Date/time information is clear

## Common Patterns

### Card with Action

```typescript
<TouchableOpacity
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Guardian: Sarah Ellis, Status: Verified"
    accessibilityHint="Tap to view guardian details"
>
    <GuardianCard name="Sarah Ellis" status="Verified" />
</TouchableOpacity>
```

### Icon-Only Button

```typescript
<TouchableOpacity
    accessibilityLabel="Notifications"
    accessibilityHint="View your notifications"
    accessibilityRole="button"
>
    <Icon name="bell" />
</TouchableOpacity>
```

### Disabled State

```typescript
<TouchableOpacity
    disabled={true}
    accessibilityLabel="Submit"
    accessibilityHint="Button is disabled. Please fill all required fields"
    accessibilityState={{ disabled: true }}
>
```

## Resources

- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS VoiceOver Guide](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios)
- [Android TalkBack Guide](https://support.google.com/accessibility/android/answer/6283677)

## Questions?

If you're unsure about accessibility for a component:
1. Test it with a screen reader
2. Ask: "Would this make sense if I couldn't see it?"
3. Consult this guide or the team
