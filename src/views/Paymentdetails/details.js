import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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



export function Details(props) {
  debugger;

  console.log("pdf props det", props.data);

  const applicationid = props.data.application_id;
  localStorage.setItem("applicationid", applicationid);

 // alert(applicationid);


  let personalData = JSON.parse(localStorage.getItem("stuperdata"));
  let eduData = JSON.parse(localStorage.getItem("stupedudata"));
  let eduHis = JSON.parse(localStorage.getItem("stueduhisdata"));
  let testScore = JSON.parse(localStorage.getItem("stutestdata"));

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.movieContainer}>
          <Image style={styles.image} source={formee_logo} />
        </View>
        <View style={styles.movieContainer}>
          <View style={styles.movieDetails}>
            <Text style={styles.receipientTitle}>General Information</Text>
            <Text style={styles.movieTitle}>
              Formee Express: {personalData.id}
            </Text>
            <Text style={styles.movieTitle}>
              Student Name:{" "}
              {personalData.first_name + " " + personalData.last_name}
            </Text>
            <Text style={styles.movieTitle}>
              Login Email: {personalData.addr_email}
            </Text>
            <Text style={styles.movieTitle}>
              Primary Email: {personalData.addr_email}
            </Text>
            <Text style={styles.movieTitle}>
              DOB: {personalData.dateof_birth}
            </Text>
            <Text style={styles.movieTitle}>
              Phone Number: {personalData.phone}
            </Text>
            <Text style={styles.movieTitle}>
              First Language: {personalData.first_language}
            </Text>
            <Text style={styles.movieTitle}>Gender: {personalData.gender}</Text>
          </View>
          <View style={styles.movieDetails}>
            <Text style={styles.invoiceTitle}>Education</Text>
            <Text style={styles.movieTitle}>
              COUNTRY OF EDUCATION: {eduData.country_name}
            </Text>
            <Text style={styles.movieTitle}>
              HIGHEST LEVEL OF EDUCATION: {eduData.educationlevel_name}
            </Text>
            <Text style={styles.movieTitle}>
              LEVEL OF EDUCATION: {eduHis.edulevel}
            </Text>
          </View>
        </View>
        <View style={styles.movieContainer}>
          <Text style={styles.invoiceTitle}>Test Scores</Text>
          <Text style={styles.movieTitle}>
            READING SCORES: {testScore.reading_score}
          </Text>
          <Text style={styles.movieTitle}>
            LISTENING SCORES: {testScore.listening_score}
          </Text>
          <Text style={styles.movieTitle}>
            WRITING SCORES: {testScore.writing_score}
          </Text>
          <Text style={styles.movieTitle}>GRE EXAM SCORES:</Text>
          <Text style={styles.movieTitle}>
            GRE EXAM DATE: {testScore.gre_exam_date}
          </Text>
          <Text style={styles.movieTitle}>
            VERBAL SCORES: {testScore.gre_verbal_score}
          </Text>
          <Text style={styles.movieTitle}>
            QUANTATIVE SCORES: {testScore.gre_quanitative_score}
          </Text>
          <Text style={styles.movieTitle}>
            WRITING SCORES: {testScore.gre_writing_score}
          </Text>
          <Text style={styles.movieTitle}>GMAT EXAM SCORES:</Text>
          <Text style={styles.movieTitle}>
            GMAT EXAM DATE: {testScore.gmat_exam_date}
          </Text>
          <Text style={styles.movieTitle}>
            VERBAL SCORES: {testScore.gmat_verbal_score}
          </Text>
          <Text style={styles.movieTitle}>
            QUANTATIVE SCORES: {testScore.gmat_quanitative_score}
          </Text>
          <Text style={styles.movieTitle}>
            WRITING SCORES: {testScore.gmat_writing_score}
          </Text>
        </View>

        {/* <View style={styles.movieContainer}>
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
        </View> */}
        {/* <View style={styles.movieContainer}>
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
        </View> */}
      </Page>
    </Document>
  );
}
