import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/theme/use-theme';
import { useI18nService } from '@/src/libs/i18n/i18n-service';
import { SharedInput } from '@/src/components/shared/shared-input';
import { SharedButton } from '@/src/components/shared/shared-button';
import { useAddHeir } from './hooks/use-add-heir';
import { IntroSection } from '../../components/intro-section';
import { InfoCard } from './components/info-card';
import { InfoRow } from './components/info-row';

const AddTrustedHeir = () => {
    const theme = useTheme();
    const { t } = useI18nService();
    const { bottom } = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const { email, error, errorMessage, isSubmitting, handleEmailChange, handleSubmit } =
        useAddHeir();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight - 24 : 0}
            style={[styles.keyboardView, { backgroundColor: theme.colors.slBg }]}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                {/* Intro Section */}
                <IntroSection
                    iconName='account-plus'
                    title={t('addHeir.title')}
                    description={t('addHeir.description')}
                />

                {/* Form Section */}
                <View style={styles.formSection}>
                    <SharedInput
                        label={t('addHeir.emailLabel')}
                        placeholder={t('addHeir.emailPlaceholder')}
                        helperText={t('addHeir.emailHelper')}
                        value={email}
                        onChangeText={handleEmailChange}
                        error={error}
                        errorMessage={errorMessage}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        editable={!isSubmitting}
                        accessibilityLabel={t('addHeir.a11yEmailLabel')}
                        accessibilityHint={t('addHeir.a11yEmailHint')}
                        onSubmitEditing={handleSubmit}
                        returnKeyType={'send'}
                    />
                </View>

                <InfoCard>
                    <InfoRow iconName='lock' text={t('addHeir.infoActive')} />
                    <InfoRow iconName='timer' text={t('addHeir.infoInactive')} />
                    <InfoRow iconName='file-check' text={t('addHeir.infoVC')} />
                </InfoCard>

                <View style={styles.spacer} />
            </ScrollView>

            <View
                style={[
                    styles.buttonContainer,
                    {
                        paddingBottom: Platform.select({
                            ios: Math.max(bottom, 24),
                            android: Math.max(bottom, 24)
                        })
                    }
                ]}
            >
                {/* Submit Button */}
                <SharedButton
                    variant='primary'
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    leftIcon={{
                        type: 'icon',
                        config: {
                            name: 'shield-plus',
                            variant: 'material-community',
                            color: theme.colors.white
                        }
                    }}
                    accessibilityLabel={t('addHeir.submit')}
                    accessibilityHint={t('addHeir.a11ySubmitHint')}
                >
                    {t('addHeir.submit')}
                </SharedButton>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddTrustedHeir;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    keyboardView: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 24,
        gap: 24,
        flexGrow: 1
    },
    formSection: {
        width: '100%'
    },
    spacer: {
        flex: 1
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingTop: 16
    }
});
