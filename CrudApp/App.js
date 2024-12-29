// Mengimpor komponen StatusBar dari 'expo-status-bar' dan komponen dasar dari 'react-native'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Fungsi utama aplikasi
export default function App() {
  return (
    // Tampilan utama aplikasi yang dibungkus dalam View dengan gaya yang telah ditentukan
    <View style={styles.container}>
      {/* Menampilkan teks di layar */}
      <Text>Open up App.js to start working on your app!</Text>
      {/* Menambahkan StatusBar dengan gaya otomatis */}
      <StatusBar style="auto" />
    </View>
  );
}

// Definisikan gaya untuk tampilan
const styles = StyleSheet.create({
  container: {
    // Menggunakan flexbox untuk membuat tampilan fleksibel
    flex: 1,
    // Menetapkan latar belakang warna putih
    backgroundColor: "#fff",
    // Mengatur agar konten di dalam View terpusat secara horizontal
    alignItems: "center",
    // Mengatur agar konten di dalam View terpusat secara vertikal
    justifyContent: "center",
  },
});

//ini jawaban no 1
