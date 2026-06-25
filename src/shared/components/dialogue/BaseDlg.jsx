import { forwardRef } from "react";
import styles from "./BaseDlg.module.css";
export const BaseDlg = forwardRef(
  ({ header, children, footer, style, contentStyle }, ref) => {
    return (
      <dialog ref={ref} style={style}>
        {/* Header */}
        <div className={styles.dlgHeader}>
          <h3>{header}</h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => ref.current.close()}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.dlgContent} style={contentStyle}>
          {children}
        </div>

        {/* Footer */}
        {footer && <div className={styles.dlgFooter}>{footer}</div>}
      </dialog>
    );
  },
);
