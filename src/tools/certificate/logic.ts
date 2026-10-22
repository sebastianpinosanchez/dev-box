import 'reflect-metadata';
import {
  X509Certificate,
  SubjectAlternativeNameExtension,
} from '@peculiar/x509';
import { requireInput, type Runner } from '@/lib/tool';
export const run: Runner = (input) => {
  const cert = new X509Certificate(requireInput(input));
  const sans =
    cert
      .getExtension(SubjectAlternativeNameExtension)
      ?.names.items.map((n) => `${n.type}: ${n.value}`) || [];
  const values = {
    subject: cert.subject,
    issuer: cert.issuer,
    serial: cert.serialNumber,
    validFrom: cert.notBefore.toISOString(),
    validUntil: cert.notAfter.toISOString(),
    subjectAlternativeNames: sans.join(', '),
  };
  return {
    text: JSON.stringify(values, null, 2),
    rows: Object.entries(values).map(([field, value]) => ({ field, value })),
    status:
      Date.now() > cert.notAfter.getTime()
        ? 'Expired · trust not verified'
        : Date.now() < cert.notBefore.getTime()
          ? 'Not yet valid · trust not verified'
          : 'Within validity period · trust not verified',
  };
};
