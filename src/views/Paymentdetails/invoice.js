import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  Table,
  DataTableCell,
  TableHeader,
  TableCell,
  TableBody,
} from "@david.kucsai/react-pdf-table";
import moment from "moment";

import formee_logo from "../../assets/img/brand/formee-footer-logo.png";
import config from "../../config.json";
import axios from "axios";

var baseurl = `${config.baseurl}`;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 10,
    marginBottom: 10,
  },
  receipientTitle: {
    fontSize: 12,
    marginBottom: 10,
  },
  invoiceTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12,
  },
  vote: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff",
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold",
  },
});

export function Invoice(props) {
  debugger;
  //console.log("pdf props", props.data);

  const applicationid = props.data.application_id;
  localStorage.setItem("applicationid", applicationid);

  axios
    .get(
      baseurl +
        "/getStudentInvoiceByAppl/" +
        localStorage.getItem("applicationid")
    )
    .then((response) => {
      console.log(response.data, "Invoice Data");
      localStorage.setItem(
        "invoiceData",
        JSON.stringify(response.data.payment_details)
      );
    })
    .catch((err) => {
      window.location.href = "#/paymentDetails";
    });

  let invoiceData = JSON.parse(localStorage.getItem("invoiceData"));
  let discount = invoiceData !== null ? Number(invoiceData.amount) * 0.05 : 0;
  let total = invoiceData !== null ? Number(invoiceData.amount) - discount : 0;

  return invoiceData !== null ? (
    <Document>
      <Page style={styles.page}>
        <View style={styles.movieContainer}>
          <Image style={styles.image} source={formee_logo} />
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>Formee Express</Text>
            <Text style={styles.movieTitle}>41 Boundary Line</Text>
            <Text style={styles.movieTitle}>North melbourne VIC 3051</Text>
            <Text style={styles.movieTitle}>ABN no</Text>
            <Text style={styles.movieTitle}>@ info@formeexpress.com</Text>
            <Text style={styles.movieTitle}>m + 678565432</Text>
          </View>
        </View>
        <View style={styles.movieContainer}>
          <View style={styles.movieDetails}>
            <Text style={styles.receipientTitle}>RECIPIENT</Text>
            <Text style={styles.movieTitle}>
              {invoiceData.customer_first_name +
                " " +
                invoiceData.customer_last_name}
            </Text>
            <Text style={styles.movieTitle}>
              {invoiceData.customer_address}
            </Text>
            <Text style={styles.movieTitle}>
              @ {invoiceData.customer_email}
            </Text>
            <Text style={styles.movieTitle}>
              m {invoiceData.customer_mobile}
            </Text>
          </View>
          <View style={styles.movieDetails}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={styles.movieTitle}>DATE {invoiceData.paid_date}</Text>
            <Text style={styles.movieTitle}>
              INVOICE NO. {invoiceData.invoiceData_no}
            </Text>
          </View>
        </View>
        <View style={styles.movieContainer}>
          <Text style={styles.invoiceTitle}>INSTITUTES NAME</Text>
          <Text style={styles.movieTitle}>{invoiceData.institute_name}</Text>
          <Text style={styles.movieTitle}>{invoiceData.course_name}</Text>
        </View>
        <View style={styles.movieContainer}>
          <Table
            data={[
              {
                fee_detail: invoiceData.fee_detail,
                amount: invoiceData.amount,
              },
            ]}
          >
            <TableHeader>
              <TableCell style={styles.movieDetails}>DESCRIPTION</TableCell>
              <TableCell style={styles.movieDetails}>FEE</TableCell>
              <TableCell style={styles.movieDetails}>AMOUNT</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => r.fee_detail} />
              <DataTableCell getContent={(r) => "$ " + r.amount + " AUD"} />
              <DataTableCell getContent={(r) => "$ " + r.amount + " AUD"} />
            </TableBody>
          </Table>
        </View>
        <View style={styles.movieContainer}>
          <Table
            data={[
              {
                amount: invoiceData.amount,
              },
            ]}
          >
            <TableHeader>
              <TableCell style={styles.movieDetails}>SUB TOTAL</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => "$ " + r.amount + " AUD"} />
            </TableBody>
          </Table>
        </View>
        <View style={styles.movieContainer}>
          <Table data={[{ discount: discount }]}>
            <TableHeader>
              <TableCell style={styles.movieDetails}>DISCOUNT 5%</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => r.discount} />
            </TableBody>
          </Table>
        </View>
        <View style={styles.movieContainer}>
          <Table data={[{ total: total }]}>
            <TableHeader>
              <TableCell style={styles.movieDetails}>TOTAL</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => "$ " + r.total + " AUD"} />
            </TableBody>
          </Table>
        </View>
        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>
            To transfert the amount, please select your payment method here.
          </Text>
          <Text style={styles.invoiceTitle}>Make a Payment</Text>
        </View>
        <View style={styles.movieContainer}>
          <Text style={styles.invoiceTitle}>NOTES</Text>
          <Text style={styles.movieTitle}>
            1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod eo
            liquidius faciet, si perspexerit rerum inter eas verborumne sit
            controversia. Tu autem negas fortem esse quemquam posse, qui dolorem
            malum putet. 2. Tum Torquatus: Prorsus, inquit, assentior; Duo
            Reges: constructio interrete. Cupit enim dícere nihil posse ad
            beatam vitam deesse sapienti. Erit enim instructus ad mortem
            contemnendam, ad exilium, ad ipsum etiam dolorem. 3. Minime vero,
            inquit ille, consentit. Quae qui non vident, nihil umquam magnum ac
            cognitione dignum amaverunt. Sed quid sentiat, non videtis.
          </Text>
        </View>
        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>
            Formee Express 41 Boundary Rd, North Melbourne VIC 3051
          </Text>
          <Text style={styles.movieTitle}>
            @ info@formeeexpress.com m +61 989 271 3115
          </Text>
          <Text style={styles.movieTitle}>
            The company is register for an Australian Business Number (ABN) no.
            87650000
          </Text>
        </View>
      </Page>
    </Document>
  ) : (
    <Document></Document>
  );
}
