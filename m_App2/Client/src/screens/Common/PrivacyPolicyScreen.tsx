import {SafeAreaView, ScrollView,  StyleSheet, Text, View} from "react-native";
import {ScreenStyles} from "../../assets/styles/AppStyles";
import {colors} from "../../assets/styles/Colors";
import {ButtonWithoutIcon} from "../../components/Button.tsx";

const PrivacyPolicyScreen = () => {
    return (
        <SafeAreaView style={[ScreenStyles.container]}>
            {/*Privacy Policy Area*/}
            <ScrollView contentContainerStyle={[ScreenStyles.subContainer]}>
                <Text style={styles.PolicyTextHeading}>Acceptance of Terms</Text>
                <Text style={styles.PolicyText}>By using EchoCycle's service, you agree to be bound by these terms and
                    conditions. If you do not agree with any part of these terms, you may not use our service.
                </Text>
                <Text style={styles.PolicyTextHeading}>Handyman Services</Text>
                <Text style={styles.PolicyText}>EchoCycle provides a platform to connect users with skilled handymen
                    for
                    various home repair and improvement tasks. The handymen are independent contractors, and
                    EchoCycle is not
                    liable for their services.</Text>

                <Text style={styles.PolicyTextHeading}>Governing Law</Text>
                <Text style={styles.PolicyText}>These terms and conditions are governed by the laws of
                    [Jurisdiction]. Any
                    disputes arising under these terms shall be subject to the exclusive jurisdiction of the
                    courts.</Text>
                <Text style={styles.PolicyText}> By using EchoCycle's handyman service, you acknowledge that you have
                    read,
                    understood, and agree to be bound
                    by these terms and conditions.</Text>

                <Text style={styles.PolicyTextHeading}>Modifications to Terms</Text>
                <Text style={styles.PolicyText}>EchoCycle reserves the right to modify these terms and conditions at
                    any time.
                    Users will be notified of any changes, and continued use of the service constitutes acceptance
                    of the
                    modified terms.</Text>

                <Text style={styles.PolicyTextHeading}>Contact Us</Text>
                <Text style={styles.PolicyText}>If you have any questions about these terms and conditions, please
                    contact us
                    at [email protected]</Text>
            </ScrollView>
            <View style={styles.AcceptButtonHolder}>
                <ButtonWithoutIcon onPress={()=>{}} buttonText={"Accept"} btnColor={colors.PRIMARY_COLOR} color={"#FFF"}/>
            </View>
        </SafeAreaView>
    );
};
export default PrivacyPolicyScreen;
const styles = StyleSheet.create({
    PolicyScrollArea: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        height: 'auto',
        flexGrow: 1,
        flexShrink: 1,
        bottom: 10,
        paddingBottom: 100
    },
    VerifyCodeInputContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 28,
        marginBottom: 20,
        alignItems: "center",
    },
    AcceptButtonHolder: {
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal:16
    },
    MapContainer: {
        backgroundColor: "#F3F6FB",
        borderRadius: 8,
        width: "100%",
        marginTop: 28,
        height: 400,
    },
    PolicyTextHeading: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.PRIMARY_COLOR,
        marginTop: 10,
    },
    PolicyText: {
        fontSize: 16,
        color: "#000",
        marginTop: 10,
        textAlign: "justify",
    },
});
