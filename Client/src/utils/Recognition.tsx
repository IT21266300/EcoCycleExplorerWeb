import { Alert } from 'react-native';
import { Validation } from './Validations.tsx';
import { ApiKeys } from '../helpers/AppSettings.tsx';
const url = `https://vision.googleapis.com/v1/images:annotate?key=${ApiKeys.GoogleAPIKEY}`;
export class Recognition {
  private static async fetchTextFromImage(
    imageUri: string,
  ): Promise<string | null> {
    try {
      const base64Image = await fetch(imageUri)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }),
        )
        .then((dataUrl: any) => dataUrl.toString().split(',')[1]);

      const request = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'TEXT_DETECTION' }],
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const json = await response.json();
      return json.responses[0].fullTextAnnotation
        ? json.responses[0].fullTextAnnotation.text
        : null;
    } catch (error) {
      console.error('Error fetching text from image:', error);
      Alert.alert('Error', 'Failed to recognize text from image.');
      return null;
    }
  }

  private static async fetchBase64Image(
    imageUri: string,
  ): Promise<string | null> {
    try {
      const base64Image = await fetch(imageUri)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }),
        )
        .then((dataUrl: any) => dataUrl.toString().split(',')[1]);

      return base64Image;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }

  public static async ImageTextRecognition(imageUri: any) {
    const text = await this.fetchTextFromImage(imageUri);
    if (text) {
      const hasPersonalDetails = Validation.detectPersonalDetails(text);
      return hasPersonalDetails;
    }
    return false;
  }

  public static async LicenseTextRecognition(
    imageUri: string,
    licenseNo: string,
  ) {
    const text = await this.fetchTextFromImage(imageUri);
    if (text) {
      const licenseExistsInText = text.includes(licenseNo);
      if (licenseExistsInText) {
        console.log('License number found:', licenseNo);
        return true;
      } else {
        console.log('License number not found');
        return false;
      }
    }
    return false;
  }

  public static async ImageFaceDetection(imageUri: any): Promise<boolean> {
    try {
      const base64Image = await fetch(imageUri)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }),
        )
        .then((dataUrl: any) => dataUrl.toString().split(',')[1]);

      const request = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'FACE_DETECTION', maxResults: 10 }],
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const json = await response.json();
      if (json.responses[0].faceAnnotations) {
        console.log(
          'Faces detected:',
          json.responses[0].faceAnnotations.length,
        );
        return true;
      } else {
        console.log('No faces detected');
        return false;
      }
    } catch (error) {
      console.error('Error during face detection:', error);
      Alert.alert('Error', 'Failed to perform face detection.');
      return false;
    }
  }

  public static async ImageFaceAndTextDetection(
    imageUri: any,
  ): Promise<{ faceDetected: boolean; textDetected: boolean }> {
    const faceDetected = await this.ImageFaceDetection(imageUri);
    const textDetected = await this.ImageTextRecognition(imageUri);
    return { faceDetected, textDetected };
  }

  public static async ImageFaceAndTextDetectionCombined(
    imageUri: any,
  ): Promise<{ faceDetected: boolean; textDetected: boolean }> {
    try {
      const base64Image = await this.fetchBase64Image(imageUri);
      if (!base64Image) return { faceDetected: false, textDetected: false };

      const request = {
        requests: [
          {
            image: { content: base64Image },
            features: [
              { type: 'FACE_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION' },
            ],
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const json = await response.json();
      const faceDetected =
        json.responses[0].faceAnnotations &&
        json.responses[0].faceAnnotations.length > 0;
      const textDetected = json.responses[0].fullTextAnnotation
        ? Validation.validateAddress(
            json.responses[0].fullTextAnnotation.text,
          ) ||
          Validation.validatePhoneNumber(
            json.responses[0].fullTextAnnotation.text,
          ) ||
          Validation.validateEmail(json.responses[0].fullTextAnnotation.text) ||
          Validation.validateWebsite(json.responses[0].fullTextAnnotation.text)
        : false;

      return { faceDetected, textDetected };
    } catch (error) {
      console.error('Error during face and text detection:', error);
      Alert.alert('Error', 'Failed to perform face and text detection.');
      return { faceDetected: false, textDetected: false };
    }
  }
}
