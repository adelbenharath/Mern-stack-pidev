import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import orderBy from "lodash/orderBy";
import { createError } from "../../redux/actions/error";
import {
  getFormsForStudy,
  getCountQuestions,
  getFormsStatus,
} from "../../redux/models/form/actions/forms";
import AllFormsQuestionsNumbersStat from "./components/stats/allFormsQuestionsNumbersStat";
import Loading from "./components/loading";
import {
  getStudies,
  getCountForms,
} from "../../redux/models/study/actions/studies";
import FormsStatusStat from "./components/stats/formsStatusStat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function FormsPage(props) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await props.actions.getCountQuestions(id);
        await props.actions.getFormsForStudy(id);
        await props.actions.getFormsStatus(id);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        throw e; // let caller know the promise was rejected with this reason
      }
    };
    fetchData();
  }, []);
  //console.log(isLoading);
  return (
    <div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {props.forms && props.countQuestions && props.formsStatus && (
            <div>
                                 {" "}
              {props.forms.map((form) => (
                <div>
                  {props.countQuestions.map((element) => {
                    if (element.formId == form._id)
                      return (
                        <div>
                          <p>{form.title} </p>
                          <p>{form.description} </p>
                          <p>{element.questionsNumber} </p>
                          <Link
                            key={form._id}
                            to={{ pathname: "/questionspage/" + form._id }}
                          >
                            {" "}
                            check{" "}
                          </Link>
                        </div>
                      );
                  })}
                </div>
              ))}
              <div>
                <AllFormsQuestionsNumbersStat
                  forms={props.forms}
                  countQuestions={props.countQuestions}
                />
              </div>
              <div>
                <FormsStatusStat formsStatus={props.formsStatus} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
FormsPage.propTypes = {
  actions: PropTypes.shape({
    getCountQuestions: PropTypes.func,
    getFormsForStudy: PropTypes.func,
    getFormsStatus: PropTypes.func,
  }),
};
export const mapStateToProps = (state) => {
  //console.log(state);
  const forms = orderBy(state.formIds.map((formId) => state.forms[formId]));
  const countQuestions = orderBy(
    state.formIds.map((formId) => state.countQuestions[formId])
  );
  const formsStatus = orderBy(
    state.formIds.map((formId) => state.formsStatus[formId])
  );
  return { forms, countQuestions, formsStatus };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        createError,
        getFormsStatus,
        getCountQuestions,
        getFormsForStudy,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);
