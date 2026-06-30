import {
    Box,
    Center,
    chakra,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Icon,
    Image,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { GiFlowerEmblem } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";

// ─── Islamic Quotes ────────────────────────────────────────────────────────────

const islamicQuotes = [
    {
        arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
        translation:
            "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
        source: "Surah Ar-Rum (30:21)",
    },
    {
        arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
        translation:
            "They are clothing for you and you are clothing for them.",
        source: "Surah Al-Baqarah (2:187)",
    },
    {
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        translation:
            "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
        source: "Surah Al-Furqan (25:74)",
    },
];

// ─── Prewed Gallery Placeholder ────────────────────────────────────────────────

const galleryImages = [
    { src: "/images/projects/cashflow-app/1.jpg", alt: "Prewed 1" },
    { src: "/images/projects/cashflow-app/2.jpg", alt: "Prewed 2" },
    { src: "/images/projects/cashflow-app/3.jpg", alt: "Prewed 3" },
    { src: "/images/projects/cashflow-app/4.jpg", alt: "Prewed 4" },
    { src: "/images/projects/cashflow-app/5.jpg", alt: "Prewed 5" },
    { src: "/images/projects/cashflow-app/6.jpg", alt: "Prewed 6" },
];

// ─── Floral Divider ────────────────────────────────────────────────────────────

const FloralDivider = () => (
    <Flex align="center" gap={3} my={8}>
        <Divider borderColor="cyan.200" />
        <Icon as={GiFlowerEmblem} color="cyan.300" boxSize={6} flexShrink={0} />
        <Divider borderColor="cyan.200" />
    </Flex>
);

// ─── Section Wrapper ───────────────────────────────────────────────────────────

const Section = ({
    children,
    bg = "white",
}: {
    children: React.ReactNode;
    bg?: string;
}) => (
    <Box as="section" bg={bg} py={[12, 20]} px={[4, 8]}>
        <Container maxW="5xl">{children}</Container>
    </Box>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const WeddingPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Ilham & Firda — Together Forever</title>
                <meta
                    name="description"
                    content="The wedding journey of Ilham Adhim and Firda — a celebration of love, faith, and togetherness."
                />
            </Head>

            {/* ── Hero / Cover ─────────────────────────────────────────── */}
            <Box
                as="section"
                minH="100vh"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                overflow="hidden"
                px={4}
            >
                {/* Soft radial glow */}
                <Box
                    position="absolute"
                    top="-20%"
                    left="-10%"
                    w="60vw"
                    h="60vw"
                    borderRadius="full"
                    bg="cyan.50"
                    filter="blur(80px)"
                    zIndex={0}
                />
                <Box
                    position="absolute"
                    bottom="-20%"
                    right="-10%"
                    w="50vw"
                    h="50vw"
                    borderRadius="full"
                    bg="cyan.50"
                    filter="blur(80px)"
                    zIndex={0}
                />

                <VStack spacing={6} zIndex={1} textAlign="center">
                    <Text
                        fontSize={["xs", "sm"]}
                        letterSpacing="widest"
                        textTransform="uppercase"
                        color="cyan.400"
                        fontWeight="semibold"
                        data-aos="fade-down"
                    >
                        In the name of Allah, the Most Gracious, the Most Merciful
                    </Text>

                    <chakra.h1
                        fontSize={["4xl", "6xl", "8xl"]}
                        fontWeight="extrabold"
                        lineHeight="1"
                        color="gray.800"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        fontFamily="Georgia, 'Times New Roman', serif"
                    >
                        Ilham
                        <chakra.span color="cyan.400"> & </chakra.span>
                        Firda
                    </chakra.h1>

                    <Flex align="center" gap={3} data-aos="fade-up" data-aos-delay="400">
                        <Divider w="60px" borderColor="cyan.200" />
                        <Icon as={MdFavorite} color="cyan.300" boxSize={4} />
                        <Divider w="60px" borderColor="cyan.200" />
                    </Flex>

                    <Text
                        fontSize={["lg", "xl"]}
                        color="gray.500"
                        maxW="md"
                        lineHeight="tall"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        Two souls, one journey — bound by love and blessed by faith.
                    </Text>

                    <Text
                        fontSize={["sm", "md"]}
                        color="cyan.400"
                        letterSpacing="wider"
                        fontStyle="italic"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        "Mawaddah wa Rahmah"
                    </Text>
                </VStack>
            </Box>

            {/* ── Islamic Quotes ───────────────────────────────────────── */}
            <Section bg="cyan.50">
                <VStack spacing={4} mb={10} textAlign="center">
                    <Text
                        fontSize={["xs", "sm"]}
                        letterSpacing="widest"
                        textTransform="uppercase"
                        color="cyan.400"
                        fontWeight="semibold"
                        data-aos="fade-down"
                    >
                        Words of Allah
                    </Text>
                    <chakra.h2
                        fontSize={["2xl", "3xl"]}
                        fontWeight="bold"
                        color="gray.800"
                        fontFamily="Georgia, serif"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        Blessings on This Sacred Bond
                    </chakra.h2>
                </VStack>

                <VStack spacing={8}>
                    {islamicQuotes.map((quote, i) => (
                        <Box
                            key={i}
                            bg="white"
                            borderRadius="2xl"
                            p={[6, 10]}
                            shadow="sm"
                            border="1px solid"
                            borderColor="cyan.100"
                            w="full"
                            data-aos="fade-up"
                            data-aos-delay={i * 150}
                        >
                            <Text
                                fontSize={["xl", "2xl"]}
                                fontFamily="'Amiri', 'Scheherazade New', serif"
                                textAlign="right"
                                color="gray.700"
                                lineHeight="2"
                                mb={4}
                                dir="rtl"
                            >
                                {quote.arabic}
                            </Text>
                            <FloralDivider />
                            <Text
                                fontSize={["md", "lg"]}
                                color="gray.600"
                                textAlign="center"
                                fontStyle="italic"
                                lineHeight="tall"
                                mb={3}
                            >
                                &ldquo;{quote.translation}&rdquo;
                            </Text>
                            <Center>
                                <Text
                                    fontSize="sm"
                                    color="cyan.400"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                >
                                    — {quote.source}
                                </Text>
                            </Center>
                        </Box>
                    ))}
                </VStack>
            </Section>

            {/* ── Names / Couple Section ───────────────────────────────── */}
            <Section bg="white">
                <VStack spacing={4} mb={12} textAlign="center">
                    <Text
                        fontSize={["xs", "sm"]}
                        letterSpacing="widest"
                        textTransform="uppercase"
                        color="cyan.400"
                        fontWeight="semibold"
                        data-aos="fade-down"
                    >
                        The Couple
                    </Text>
                    <chakra.h2
                        fontSize={["2xl", "3xl"]}
                        fontWeight="bold"
                        color="gray.800"
                        fontFamily="Georgia, serif"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        Ilham & Firda
                    </chakra.h2>
                </VStack>

                <SimpleGrid columns={[1, 2]} gap={10} alignItems="center">
                    {/* Groom */}
                    <VStack
                        spacing={4}
                        textAlign="center"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <Box
                            w="160px"
                            h="160px"
                            borderRadius="full"
                            bg="cyan.50"
                            border="4px solid"
                            borderColor="cyan.200"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="5xl"
                            overflow="hidden"
                        >
                            🤵
                        </Box>
                        <chakra.h3
                            fontSize="2xl"
                            fontWeight="bold"
                            color="gray.800"
                            fontFamily="Georgia, serif"
                        >
                            Muhammad Ilham Adhim
                        </chakra.h3>
                        <Text color="gray.500" fontSize="sm" lineHeight="tall">
                            Son of Bapak & Ibu
                        </Text>
                    </VStack>

                    {/* Bride */}
                    <VStack
                        spacing={4}
                        textAlign="center"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <Box
                            w="160px"
                            h="160px"
                            borderRadius="full"
                            bg="cyan.50"
                            border="4px solid"
                            borderColor="cyan.200"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="5xl"
                            overflow="hidden"
                        >
                            👰
                        </Box>
                        <chakra.h3
                            fontSize="2xl"
                            fontWeight="bold"
                            color="gray.800"
                            fontFamily="Georgia, serif"
                        >
                            Firda
                        </chakra.h3>
                        <Text color="gray.500" fontSize="sm" lineHeight="tall">
                            Daughter of Bapak & Ibu
                        </Text>
                    </VStack>
                </SimpleGrid>

                <Box mt={14} textAlign="center" data-aos="fade-up" data-aos-delay="300">
                    <Box
                        display="inline-block"
                        bg="cyan.50"
                        border="1px solid"
                        borderColor="cyan.200"
                        borderRadius="2xl"
                        px={10}
                        py={6}
                    >
                        <Text
                            fontSize={["sm", "md"]}
                            color="gray.600"
                            lineHeight="tall"
                            fontStyle="italic"
                        >
                            "The best of you are those who are best to their wives."
                        </Text>
                        <Text fontSize="xs" color="cyan.400" fontWeight="semibold" mt={2}>
                            — Prophet Muhammad ﷺ (Tirmidhi)
                        </Text>
                    </Box>
                </Box>
            </Section>

            {/* ── Gallery ──────────────────────────────────────────────── */}
            <Section bg="cyan.50">
                <VStack spacing={4} mb={12} textAlign="center">
                    <Text
                        fontSize={["xs", "sm"]}
                        letterSpacing="widest"
                        textTransform="uppercase"
                        color="cyan.400"
                        fontWeight="semibold"
                        data-aos="fade-down"
                    >
                        Prewed Gallery
                    </Text>
                    <chakra.h2
                        fontSize={["2xl", "3xl"]}
                        fontWeight="bold"
                        color="gray.800"
                        fontFamily="Georgia, serif"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        Our Moments Together
                    </chakra.h2>
                    <Text
                        color="gray.500"
                        maxW="md"
                        lineHeight="tall"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        A glimpse of our story, captured in light and love.
                    </Text>
                </VStack>

                <Grid
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(2, 1fr)",
                        "repeat(3, 1fr)",
                    ]}
                    gap={4}
                >
                    {galleryImages.map((img, i) => (
                        <GridItem
                            key={i}
                            data-aos="zoom-in"
                            data-aos-delay={i * 100}
                            overflow="hidden"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="cyan.100"
                            bg="white"
                            aspectRatio={1}
                            position="relative"
                            _hover={{ transform: "scale(1.02)", transition: "0.3s ease" }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                w="full"
                                h="full"
                                objectFit="cover"
                                fallback={
                                    <Flex
                                        w="full"
                                        h="full"
                                        minH="220px"
                                        align="center"
                                        justify="center"
                                        bg="cyan.50"
                                        flexDir="column"
                                        gap={2}
                                    >
                                        <Icon
                                            as={GiFlowerEmblem}
                                            color="cyan.200"
                                            boxSize={10}
                                        />
                                        <Text fontSize="xs" color="cyan.300">
                                            Photo {i + 1}
                                        </Text>
                                    </Flex>
                                }
                            />
                        </GridItem>
                    ))}
                </Grid>
            </Section>

            {/* ── Closing ──────────────────────────────────────────────── */}
            <Box
                as="section"
                bg="white"
                py={[16, 24]}
                textAlign="center"
                px={4}
                borderTop="1px solid"
                borderColor="cyan.100"
            >
                <Container maxW="lg">
                    <Icon
                        as={GiFlowerEmblem}
                        color="cyan.200"
                        boxSize={10}
                        mb={4}
                        data-aos="zoom-in"
                    />
                    <chakra.h2
                        fontSize={["2xl", "3xl"]}
                        fontWeight="bold"
                        color="gray.800"
                        fontFamily="Georgia, serif"
                        mb={4}
                        data-aos="fade-up"
                    >
                        Barakallahu Lakuma
                    </chakra.h2>
                    <Text
                        color="gray.500"
                        fontSize={["md", "lg"]}
                        lineHeight="tall"
                        fontStyle="italic"
                        mb={2}
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        "May Allah bless you both, and may He bring good in your union."
                    </Text>
                    <Text
                        fontSize="sm"
                        color="cyan.400"
                        fontWeight="semibold"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        — Dua for the newlyweds (Abu Dawud)
                    </Text>
                </Container>
            </Box>
        </>
    );
};

export default WeddingPage;

