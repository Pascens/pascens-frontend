import { InfoBanner } from "@/components/BannerDidYouKnow/BannerDidYouKnow";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CAROUSEL_PADDING = 20;
const AUTOPLAY_MS = 4000;
const CAROUSEL_OVERLAP = 90;

export default function HomeScreen() {
  const capitalized = new Date()
    .toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/^./, (c) => c.toUpperCase());

  const { data: banners } = useQuery({
    queryKey: ["banners"],
    queryFn: () => api.get("/banners").then((res) => res.data),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products-simple").then((res) => res.data),
  });

  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!banners || banners.length < 2) return;
    const interval = setInterval(() => {
      if (isDraggingRef.current) return;
      const next = (activeIndex + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * next, animated: true });
      setActiveIndex(next);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [activeIndex, banners]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        preTitle={"Buenos días,"}
        title={"Arturo"}
        subtitle={capitalized}
        height={180}
      />

      {banners && (
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onScrollBeginDrag={() => {
              isDraggingRef.current = true;
            }}
            onScrollEndDrag={() => {
              isDraggingRef.current = false;
            }}
            onMomentumScrollEnd={onMomentumScrollEnd}
            style={styles.carouselWrapper}
          >
            {banners.map((item: any, index: number) => (
              <View key={item.id ?? String(index)} style={styles.slide}>
                <InfoBanner
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  note={item.note}
                  image={{ uri: item.image.src }}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.dots}>
            {banners.map((_: unknown, i: number) => (
              <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
            ))}
          </View>
        </View>
      )}

      {products && (
        <View style={styles.card}>
          {[
            {
              title: "Escaneados recientemente",
              icon_name: "time-outline",
              data: products.slice(0, 5),
            },
            {
              title: "Productos de bajo riesgo",
              icon_name: "leaf-outline",
              data: products.slice(5, 10),
            },
            {
              title: "Productos de la semana",
              icon_name: "star-outline",
              data: products.slice(10, 15),
            },
          ].map((section) => (
            <ProductCarousel key={section.title} title={section.title} products={section.data} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  carouselContainer: {
    position: "relative",
  },
  carouselWrapper: {
    flexGrow: 0,
    marginTop: -CAROUSEL_OVERLAP,
  },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: CAROUSEL_PADDING,
  },
  dots: {
    position: "absolute",
    bottom: 16,
    left: CAROUSEL_PADDING + 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#fff",
  },
  card: {
    gap: 20,
    paddingTop: 16,
  },
});
