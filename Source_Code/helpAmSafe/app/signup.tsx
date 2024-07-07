import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const logoImage = require("../assets/images/LOGO.png");
const welcomeImage = require("../assets/images/signUp.png");

const Page: React.FC = () => {
  // Fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // useState to manage first name, last name, country code, and phone number
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+237");

  const keyboardVerticalOffset = Platform.OS == "ios" ? 80 : 0;

  const router = useRouter();

  const { signUp } = useSignUp();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[styles.container, { flex: 1, paddingTop: 25 }]}>
        <Image source={logoImage} style={styles.logo} />
        {/* <Image source={welcomeImage} style={styles.welcomeImage} /> */}

        <Text style={[styles.text, { paddingTop: 10 }]}>
          Create your account
        </Text>

        <View>
          <Text
            style={{ textAlign: "center", fontSize: 14, color: Colors.gray }}
          >
            Dem go send one verification code go your phone number for verify
            your account.
          </Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g Hewett Chia"
          placeholderTextColor={Colors.gray}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1, textAlign: "left" }]}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 2, textAlign: "left" }]}
            placeholder="Enter your phone number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={Colors.gray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
          ]}
          onPress={onSignup}
        >
          <Text style={styles.textButton}>Create your account</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Already have an account? </Text>
          <Link href={"/login"}>
            <Text style={styles.signupText}>Log in</Text>
          </Link>
        </View>

        <Text style={styles.orRegisterText}>Or Register Using</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={30} color={"#1877F2"} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={30} color={"#EA4335"} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    paddingTop: 16,
    alignSelf: "center",
  },
  welcomeImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
    marginVertical: 10
  },
  label: {
    paddingTop: 10,
    fontSize: 14,
    color: Colors.gray,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pillButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  enabled: {
    backgroundColor: Colors.purple,
  },
  disabled: {
    backgroundColor: Colors.lightPurple,
  },
  textButton: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  termsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  termsText: {
    fontSize: 14,
    color: Colors.gray,
  },
  linkText: {
    color: Colors.green,
    textDecorationLine: "underline",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 14,
    color: Colors.gray,
  },
  signupText: {
    color: Colors.green,
    textDecorationLine: "underline",
  },
  orRegisterText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    color: Colors.gray,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    width: "40%",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  socialButtonText: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Page;
