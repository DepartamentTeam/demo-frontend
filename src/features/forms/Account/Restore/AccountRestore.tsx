import { Input } from "@/shared/ui/Input/Input";
import styles from "@/features/forms/form.module.css";
import {ArrowLeft} from '@gravity-ui/icons';
import { useTranslations } from "next-intl";
import Link from "next/link";

export function AccountRestore() {  
    const t = useTranslations();

    return(
        <div className={styles.form}>
            <div className={styles.form__title}>
            <h1 className="subhead-2__black">{t("Restore.title")}</h1>
            <p>{t("Restore.subtitle")}</p>
            </div>
            <form className={styles.form__container}>
            <Input 
            name="email"
            autoComplete="email"
            placeholder={t("Restore.placeholder")}
            label=""
            type="email"
            />
            <div className={styles.btns}>
            <Link className=" btn btn--text btn--icon" href="/account/sign-in"> <ArrowLeft/>{t("btns.back")}</Link>
            
            <button type="submit" className="btn btn--primary btn--disabled">{t("btns.send")}</button>
            </div>
            </form>
        </div>
    );
}