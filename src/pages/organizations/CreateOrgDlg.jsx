import { forwardRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { BaseDlg } from "../../shared/components/dialogue/BaseDlg";
import { useCreateOrganization } from "../../queries/organizationQueries";
import styles from "./CreateOrgDlg.module.css";

const orgSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Organization name is required"),
  isActive: yup.boolean().required("Status is required"),
  establishedYear: yup
    .number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Established year is required")
    .typeError("Must be a valid year"),
});

const initValues = {
  name: "",
  isActive: true,
  establishedYear: "",
};

export const CreateOrgDlg = forwardRef((_, ref) => {
  const { mutateAsync: createOrganization } = useCreateOrganization();

  const close = () => ref.current?.close();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createOrganization(values);
      toast.success("Organization created!");
      resetForm();
      close();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={orgSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, resetForm }) => (
        <BaseDlg
          ref={ref}
          header="Create Organization"
          footer={
            <>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => { resetForm(); close(); }}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="create-org-form"
                className="btn btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </>
          }
        >
          <Form id="create-org-form">
            {/* Org Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Organization Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                placeholder="e.g. Acme Corp"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched.name && errors.name)}
              />
              <ErrorMessage name="name" component="div" className="errorMsg" />
            </div>

            {/* Status */}
            <div className={styles.formGroup}>
              <label>Status</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="isActive"
                    checked={values.isActive === true}
                    onChange={() =>
                      handleChange({ target: { name: "isActive", value: true } })
                    }
                  />
                  Active
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="isActive"
                    checked={values.isActive === false}
                    onChange={() =>
                      handleChange({ target: { name: "isActive", value: false } })
                    }
                  />
                  Inactive
                </label>
              </div>
              <ErrorMessage name="isActive" component="div" className="errorMsg" />
            </div>

            {/* Established Year */}
            <div className={styles.formGroup}>
              <label htmlFor="establishedYear">Established Year</label>
              <input
                id="establishedYear"
                name="establishedYear"
                type="number"
                className="input"
                placeholder="e.g. 2010"
                value={values.establishedYear}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched.establishedYear && errors.establishedYear)}
              />
              <ErrorMessage
                name="establishedYear"
                component="div"
                className="errorMsg"
              />
            </div>
          </Form>
        </BaseDlg>
      )}
    </Formik>
  );
});
