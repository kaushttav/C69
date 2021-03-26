import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const img={uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg"}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
    });
    alert('QR Code data: ' + data);
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    if (hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
            <ImageBackground source={img} style={{width:1000,height:600}}>
          <View>
           
            <Text style={{ textAlign: 'center', fontSize: 40,borderWidth:20 ,borderColor:"white"}}>
              Bar Code Scanner
            </Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={async () => {
              if (hasCameraPermissions === null) {
                this.getCameraPermissions();
              }
            }}>
            <Text style={styles.submitButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
          </ImageBackground>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'white',
    marginTop:50,
    borderWidth:15,
    width:200,
    marginLeft:388,
    marginTop:375,
    borderColor:"black",
    borderRadius:20,
  },
  submitButtonText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    
  },
});