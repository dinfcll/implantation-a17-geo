using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SqueletteImplantation
{
    public class EmailSender
    {
        private MimeMessage message{ get; set; }
        private SmtpClient smtpClient { get; set; }
        public EmailSender() {
            message = new MimeMessage();
            smtpClient = new SmtpClient();
        }
        public void SetMessage(String msg) {
            message.Body = new TextPart("plain")
            {
                Text = msg
            };
        }
        public void SetHTMLMessage(string msg) {
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody=msg;
            message.Body = bodyBuilder.ToMessageBody();
        }
        public void setSender(string email, string name) {
            message.From.Add(new MailboxAddress(name, email));
        }
        public void setDestination(string email) {
            message.To.Add(new MailboxAddress("", email));
        }
        public void addDestination(string email) {
            message.To.Add(new MailboxAddress("", email));

        }
        public void setSubject(string subject) {
            message.Subject = subject;
        }
        public void sendMessage() {
            smtpClient.Connect("smtp.gmail.com", 587, false);
            smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
            smtpClient.Authenticate("ramble.cll@gmail.com", "annieisbae");
            smtpClient.Send(message);
            smtpClient.Disconnect(true);
        }
    }
}
