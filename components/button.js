import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function LinkButton({ textButton, linkHref = '' }){
  return (
    <div style={{ padding: 8}}>
      <Link className={styles.button} href={linkHref}> {textButton}</Link>
    </div>
  );
};