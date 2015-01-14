/*
  employee.js
  Language: el-el
*/
define({
    "STR_BUSINESS_EMPLOYEES": "Εργαζόμενοι Επιχείρησης",
    "STR_MANAGE_YOUR_EMPLOYEES_AND_ASSIGN": "Διαχειριστείτε τους εργαζόμενους σας και αναθέστε τους εκπαιδευτικούς στόχους.",
    "STR_PLEASE_WAIT_WHILE_THE_EMPLOYEES": "Παρακαλώ περιμένετε μέχρι να ενημερωθούν οι εργαζόμενοι για να μπορούν να ανταποκριθούν σε αυτές τις αλλαγές.",
    "STR_OVERALL_EMPLOYEE_VIEW": "Συνολική Επισκόπηση Εργαζομένων",
    "STR_LOADING_EMPLOYEE_DATA": "Φόρτωση δεδομένων εργαζομένων...",
    "STR_ASSIGN_GOALS": "Ανάθεση στόχων:",
    "STR_SEND_EMAIL": "Αποστολή email:",
    "STR_SHOW_DEADLINES": "Εμφάνιση Προθεσμιών:",
    "STR_NAME_MUST_NOT_BE_EMPTY": "Το όνομα δεν πρέπει να είναι κενό.",
    "STR_EMAIL": "Email",
    "STR_ENTER_EMAIL": "Εισάγετε email",
    "STR_PLEASE_ENTER_A_VALID_EMAIL_ADRESS": "Παρακαλώ εισάγετε μια έγγυρη διεύθυνση email.",
    "STR_VIEW/UPDATE_EMPLOYEE": "Προβολή/Αναθεώρηση Εργαζόμενου",
    "STR_ADD_NEW_EMPLOYEE": "Προσθήκη νέου Εργαζόμενου",
    "STR_RELEVANT": "Σχετικά",
    "STR_START_DATE": "Ημερομηνία Έναρξης",
    "STR_END_DATE": "Ημερομηνία Ολοκλήρωσης",
    "STR_START_LEVEL": "Επίπεδο Έναρξης:",
    "STR_CURRENT_LEVEL": "Τρέχον Επίπεδο:",
    "STR_END_LEVEL": "Επίπεδο Ολοκλήρωσης:",
    "STR_DO_YOU_WANT_TO_DELETE_EMPLOYEE": "Είστε σίγουροι ότι θέλετε να διαγράψετε τον/την {{employee.name}} ως εργαζόμενο?",
    "STR_BUSINESS_EMPLOYEES_HELP": "Βοήθεια Εργαζομένων Επιχείρησης ",
    "STR_IN_THE_BUSINESS_EMPLOYEES_WIDGET": "Στο widget Εργαζόμενοι της Επιχείρησης μπορείτε να αναθέσετε στόχους στους εργαζόμενους, να προσαρμόσετε τα εκπαιδευτικά τους επίπεδα και να τους ορίσετε διορίες.",
    "STR_TO_SEE_MORE_OPTIONS_CLICK_ON": "Για περισσότερες επιλογές κάντε κλικ στο εικονίδιο <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\"><i class=\"fa fa-cogs\"></em><span class=\"caret\"></span></button>.",
    "STR_TO_ASSIGN_GOALS_TO_EMPLOYEE_AND": "Για να αναθέσετε στόχους στον εργαζόμενο και να ορίσετε το εκπαιδευτικό επίπεδο κάντε κλικ στο εικονίδιο <button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-flag\" style=\"margin-right:5px;\"></span></button> . Στην νέα όψη ελέγξτε τους σχετικούς στόχους για τον συγκεκριμένο εργαζόμενο.",
    "STR_CHECK_IN_RELEVANT_LEARNING_INDICATORS": "Εξετάστε σχετικούς εκπαιδευτικούς δείκτες και προσδιορίστε τα εκπαιδευτικά επίπεδα για αυτόν τον εργαζόμενο κάνοντας κλικ στο όνομα του στόχου και επιλέγοντας τα επίπεδα έναρξης, τρέχον και ολοκλήρωσης αντίστοιχα.",
    "STR_CHOOSE_START_AND_END_DATES_FOR": "Επιλέξτε τις ημερομηνίες έναρξης και ολοκλήρωσης των εκπαιδευτικών δεικτών.",
    "STR_DESCRIPTIONS_OF_LEARNING_LEVELS": "Περιγραφές εκπαιδευτικού επιπέδου:",
    "STR_LEVEL_0_I_HAVE_NOT_STARTED_TO": "<li><strong>Επίπεδο 0:</strong> Δεν έχω ξεκινήσει να αποκτώ τις δεξιότητες/ γνώσεις που απαιτούναι για τον εν λόγω δείκτη. </li><li><strong>Επίπεδο 1:</strong> Έχω ξεκινήσει την προσπάθεια για να αποκτήσω τις δεξιότητες/γνώσεις για τον δείκτη αυτό όμως χρειάζομαι περισσότερο χρόνο/ υποστήριξη για να σημειώσω πρόοδο. </li><li><strong>Επίπεδο 2:</strong> Πιστεύω ότι έχω αποκτήσει κάποιες δεξιότητες/ γνώσεις και γνωρίζω την πρόοδο που έχω κάνει σχετικά με αυτόν τον δείκτη πιστεύω όμως ότι πρέπει να μάθω περισσότερα πριν τα εφαρμόσω στην δουλειά.</li><li><strong>Επίπεδο 3:</strong> Πιστεύω ότι έχω αποκτήσει σημαντικές δεξιότητες/ γνώσεις για την παρούσα εργασική μου θέση και έχω ξεκινήσει να τα εφαρμόζω στην πράξη στην εργασία μου. </li><li><strong>Επίπεδο 4:</strong> Πιστεύω πως έχω αποκτήσει σημαντικές γνώσεις πάνω στις δεξιότητες για την τρέχουσα εργασιακή μου θέση αλλά για περαιτέρω εξέλιξη μέσα στην εταιρία, θεωρώ πως μπορώ να βελτιωθώ ακόμα περισσότερο.</li><li><strong>Επίπεδο 5:</strong> Νιώθω αρκετά σίγουρος στην χρήση αυτών των δεξιοτήτων και γνώσεων που θα μπορούσα να βοηθήσω και μερικούς συνάδελφους σχετικά με αυτά?</li>",
    "STR_TO_MONITOR_THE_LEARNING_EMPLOYEE": "Για να παρακολουθήσετε την εκπαιδευτική πρόοδο του εργαζόμενου πηγαίνετε στο widget <em>Εκπαιδευτική Πρόοδος</em> κάντε κλικ στο εικονίδιο <button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-stats tooltip-showGoalProgress\" data-placement=\"left\" data-toggle=\"tooltip\" data-original-title=\"Show Progress: Decor and Furnishing\"></span></button> .",
    "STR_TO_SEND_EMAIL_TO_THE_EMPLOYEES": "Για να στείλετε email στους εργαζόμενους κάντε κλικ στο εικονίδιο <button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-envelope\" style=\"margin-right:5px;\"></span></button> . Ένα αναδυόμενο παράθυρο αλληλογραφίας θα εμφανιστεί.",
    "STR_IN_THIS_WIDGET_YOU_CAN_SEE_YOUR": "Σε αυτό το widget μπορείτε να δείτε τα στοιχεία του προφίλ σας. Κάντε κλικ στο εικονίδιο <button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-stats\"></span></button> για να δείτε την συνολική σας πρόοδο στο widget Εκπαιδευτική Πρόοδος."
});