import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        margin: 10,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "25%", // Anda bisa mengatur lebar kolom sesuai kebutuhan
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    tableCell: {
        fontSize: 10,
        textAlign: "center",
    },
});

const MyDocument = ({ api }) => (
    <Document>
        <Page size={"A3"} >
            <View style={{width: '100%',textAlign: 'center', margin: '10px'}}>
                <Text style={{fontSize: '20px', fontWeight: '600'}} >Data Peminjaman Barang</Text>
            </View>
            <View style={styles.table}>
                {/* Header Row */}
                <View style={styles.tableRow}>
                    <View style={{width: '50px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={styles.tableCellHeader}>NO</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>NAMA</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>EMAIL</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>NAMA BARANG</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>MERK</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>JUMLAH PINJAM</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>TANGGAL PINJAM</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>TANGGAL KEMBALI</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>STATUS</Text>
                    </View>
                </View>
                {api.status == 200
                ? api.data.map((data, index) => {
                    return (
                        <View key={index} style={styles.tableRow}>
                            <View style={{width: '50px', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.nama_user}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.email}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.nama_barang}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.merk}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.stock}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.tgl_pinjam}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.tgl_kembali}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.status}</Text>
                            </View>
                        </View>
                    )
                })
            : null}
            </View>
        </Page>
    </Document>
);

export default MyDocument
