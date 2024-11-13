import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextStyles } from '../../assets/styles/AppStyles';
import { colors } from '../../assets/styles/Colors';
import TickIcon from '../../assets/vectors/TickIcon';
import { ButtonWithoutIcon } from '../../components/Button.tsx';

const SignUpSuccessScreen = ({ navigation }: any) => {
  function navigateTo(rootName: string) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: rootName,
        },
      ],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: '20%',
        }}>
        <TickIcon />
        <Text style={[TextStyles.H1]}>Congratulations</Text>
        <Text style={[TextStyles.P, { paddingHorizontal: '10%' }]}>
          Your account is now active. You'll be redirected to the Dashboard
          shortly.
        </Text>
      </View>
      <View style={styles.BottomContainer}>
        <Text style={styles.BottomContainerHeadingDark}>Do Your Task </Text>
        <Text style={styles.BottomContainerHeadingGreen}>
          Fast&nbsp;<Text style={styles.BottomContainerHeadingDark}>&</Text>
          &nbsp;Efficiently
        </Text>
        <Text
          style={[
            TextStyles.H7,
            { textAlign: 'center', padding: 10, marginBottom: 5 },
          ]}>
          Tasker's can work more efficiently and communicate with customers
          quickly through this software
        </Text>
        <View style={{ marginVertical: 20 }}>
          <ButtonWithoutIcon
            onPress={() => navigateTo('Login')}
            buttonText={'Go to sign in'}
            btnColor={colors.PRIMARY_COLOR}
            color={'#FFF'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUpSuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F8F8F8',
  },
  BottomContainer: {
    bottom: 0,
    end: 0,
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  BottomContainerHeadingDark: {
    fontSize: 28,
    color: colors.PRIMARY_BLACK,
    fontWeight: '900',
    textAlign: 'center',
  },
  BottomContainerHeadingGreen: {
    fontSize: 28,
    color: colors.PRIMARY_COLOR,
    fontWeight: '900',
    textAlign: 'center',
  },
});
