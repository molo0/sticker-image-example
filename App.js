import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Draggable from "react-native-draggable";
import ViewShot from "react-native-view-shot";

export default function App() {
  const ref = useRef();
  const [stickers, setStickers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [ImageUri, setImageUri] = useState(null);
  const dragableSticker = (index) => {
    return (
      <Draggable
        imageSource={require("./assets/pikachu.jpeg")}
        renderSize={80}
        x={200}
        y={300}
        maxY={PixelRatio.getPixelSizeForLayoutSize(200)}
        key={index}
      ></Draggable>
    );
  };
  const addSticker = () => {
    setStickers([...stickers, dragableSticker(stickers.length)]);
  };
  const showImageDialog = () => {
    ref.current.capture().then((uri) => {
      setImageUri(uri);
      setModalVisible(true);
      console.log("do something with ", uri);
    });
  };
  const ImageModal = (uri) => {
    return (
      <Modal style={{ flex: 1 }} visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: uri }}
            style={{ width: "100%", height: "90%" }}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {ImageModal(ImageUri)}
        <ViewShot
          style={{
            width: "100%",
            height: PixelRatio.getPixelSizeForLayoutSize(200),
          }}
          ref={ref}
        >
          <Image
            source={require("./assets/ex.jpg")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          {stickers.map((sticker) => {
            return sticker;
          })}
          {/* <ImageBackground
            source={require("./assets/ex.jpg")}
            style={styles.image}
          >
            {stickers.map((sticker) => {
              return sticker;
            })}
          </ImageBackground> */}
        </ViewShot>

        <TouchableOpacity onPress={addSticker}>
          <Image
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(30),
              height: PixelRatio.getPixelSizeForLayoutSize(30),
            }}
            source={require("./assets/pikachu.jpeg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showImageDialog} style={{ padding: 10 }}>
          <Text>이미지 추출</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
