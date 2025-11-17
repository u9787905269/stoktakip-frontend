export const translations = {
  tr: {
    common: {
      appTitle: 'StokTakip Kontrol Paneli',
      cancel: 'İptal',
      save: 'Kaydet',
      add: 'Ekle',
      delete: 'Sil',
      edit: 'Düzenle',
      close: 'Kapat',
      loading: 'Yükleniyor...',
      noResults: 'Sonuç bulunamadı.',
      searchPlaceholder: 'Ürün, kategori, seri no veya barkod ara...',
      yes: 'Evet',
      no: 'Hayır',
      print: 'Yazdır',
      download: 'İndir',
      back: 'Geri',
      notAvailable: '—'
    },
    nav: {
      dashboard: 'Panel',
      products: 'Ürünler',
      invoices: 'Faturalar',
      reports: 'Raporlar',
      settings: 'Ayarlar'
    },
    settings: {
      title: 'Ayarlar',
      languageCardTitle: 'Dil Seçenekleri',
      languageLabel: 'Dil',
      languageHint: 'Dil tercihi tarayıcıda saklanır ve yeniden açıldığında kullanılabilir.',
      themeCardTitle: 'Tema Tercihi',
      darkModeLabel: 'Karanlık Mod',
      lightModeLabel: 'Aydınlık Mod',
      themeHint: 'Tema tercihi uygulama temasını günceller ve tarayıcıda saklanır.'
    },
    dashboard: {
      title: 'Hoş geldiniz',
      subtitle: 'Barkod destekli stok takibi için özet gösterge paneli.',
      cards: {
        totalProducts: {
          title: 'Toplam Ürün',
          description: 'Aktif ürün sayısı'
        },
        totalStock: {
          title: 'Toplam Stok',
          description: 'Toplam stok mevcudu'
        },
        last24Hours: {
          title: 'Son 24 Saat',
          description: 'Kayıtlı stok hareketi'
        }
      },
      filters: {
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi'
      },
      recentMovements: {
        title: 'En Son Stok Hareketleri',
        empty: 'Henüz stok hareketi bulunmuyor.',
        unknownProduct: 'Ürün',
        unknownWarehouse: 'Depo bilgisi yok',
        inbound: 'Giriş',
        outbound: 'Çıkış'
      }
    },
    products: {
      title: 'Ürünler',
      addButton: 'Yeni Ürün',
      table: {
        productName: 'Ürün Adı',
        category: 'Kategori',
        unitPrice: 'Birim Fiyat',
        unitBtw: 'Birim BTW',
        totalBtw: 'Toplam BTW',
        totalPrice: 'Toplam Fiyat',
        btwRate: 'BTW %',
        stockQuantity: 'Stok Adedi',
        serialNumber: 'Seri No',
        warehouse: 'Depo Adı',
        createdAt: 'Kayıt Tarihi',
        barcode: 'Barkod',
        actions: 'İşlemler'
      },
      showBarcode: 'Barkodu Göster',
      filters: {
        searchPlaceholder: 'Ürün, kategori, seri no veya barkod ara...'
      },
      notifications: {
        createSuccess: 'Ürün kaydedildi',
        createError: 'Ürün kaydedilemedi',
        updateSuccess: 'Ürün güncellendi',
        updateError: 'Ürün güncellenemedi',
        deleteSuccess: 'Ürün silindi',
        deleteError: 'Ürün silinemedi',
        categoryCreateSuccess: 'Kategori eklendi',
        categoryCreateError: 'Kategori eklenemedi',
        categoryDeleteSuccess: 'Kategori silindi',
        categoryDeleteError: 'Kategori silinemedi',
        categoryRequired: 'Kategori adı giriniz',
        productNameCreateSuccess: 'Ürün adı eklendi',
        productNameCreateError: 'Ürün adı eklenemedi',
        productNameDeleteSuccess: 'Ürün adı silindi',
        productNameDeleteError: 'Ürün adı silinemedi',
        productNameRequired: 'Ürün adı giriniz',
        serialCreateSuccess: 'Seri numarası eklendi',
        serialCreateError: 'Seri numarası eklenemedi',
        serialDeleteSuccess: 'Seri numarası silindi',
        serialDeleteError: 'Seri numarası silinemedi',
        serialRequired: 'Seri numarası giriniz',
        warehouseCreateSuccess: 'Depo eklendi',
        warehouseCreateError: 'Depo eklenemedi',
        warehouseDeleteSuccess: 'Depo silindi',
        warehouseDeleteError: 'Depo silinemedi',
        warehouseRequired: 'Depo adı giriniz'
      },
      confirmations: {
        deleteProduct: 'Bu ürünü silmek istiyor musunuz?',
        deleteCategory: 'Seçili kategoriyi silmek istiyor musunuz?',
        deleteProductName: 'Seçili ürün adını silmek istiyor musunuz?',
        deleteSerial: 'Seçili seri numarasını silmek istiyor musunuz?',
        deleteWarehouse: 'Seçili depoyu silmek istiyor musunuz?'
      },
      form: {
        addTitle: 'Yeni Ürün Ekle',
        productNameLabel: 'Ürün Adı',
        productNamePlaceholder: 'Ürün adı seçin',
        categoryLabel: 'Kategori',
        categoryPlaceholder: 'Kategori seçin',
        descriptionLabel: 'Açıklama',
        unitPriceLabel: 'Birim Fiyat',
        btwRateLabel: 'BTW Oranı (%)',
        stockQuantityLabel: 'Stok Adedi',
        serialNumberLabel: 'Seri Numarası',
        serialNumberPlaceholder: 'Seri numarası seçin',
        warehouseLabel: 'Depo',
        warehousePlaceholder: 'Depo seçin',
        computedValuesTitle: 'Hesaplanan Değerler',
        unitBtw: 'Birim BTW',
        unitGross: 'Birim Brüt',
        totalBtw: 'Toplam BTW',
        totalGross: 'Toplam Brüt',
        totalNet: 'Toplam Net',
        submit: 'Kaydet',
        cancel: 'İptal'
      },
      editDialog: {
        title: 'Ürün Bilgilerini Güncelle',
        unitPriceLabel: 'Birim Fiyat (KDV Dahil)',
        stockQuantityLabel: 'Stok Adedi',
        reasonLabel: 'Hareket Nedeni',
        reasonPlaceholder: 'Neden seçin',
        helperText: 'Herhangi bir değişiklik yapıyorsanız seçiniz',
        customReasonLabel: 'Manuel Not',
        customReasonPlaceholder: 'İsteğe bağlı açıklama'
      },
      adjustmentReasons: {
        sale: 'Satış',
        disposal: 'İmha',
        return: 'İade',
        purchase: 'Satın Alma',
        increase: 'Stok Artışı',
        decrease: 'Stok Azalışı',
        vatChange: 'BTW Oranı Değişikliği',
        priceChange: 'Fiyat Değişikliği'
      },
      dialogs: {
        newProductNameTitle: 'Yeni Ürün Adı',
        newProductNameLabel: 'Ürün Adı',
        newCategoryTitle: 'Yeni Kategori',
        newCategoryLabel: 'Kategori Adı',
        newSerialTitle: 'Yeni Seri Numarası',
        newSerialLabel: 'Seri Numarası',
        newWarehouseTitle: 'Yeni Depo',
        newWarehouseNameLabel: 'Depo Adı',
        newWarehouseLocationLabel: 'Konum (opsiyonel)',
        newWarehouseDescriptionLabel: 'Açıklama (opsiyonel)'
      },
      tooltips: {
        addProductName: 'Yeni ürün adı ekle',
        deleteProductName: 'Seçili ürün adını sil',
        addCategory: 'Yeni kategori ekle',
        deleteCategory: 'Seçili kategoriyi sil',
        addSerial: 'Yeni seri numarası ekle',
        deleteSerial: 'Seçili seri numarasını sil',
        addWarehouse: 'Yeni depo ekle',
        deleteWarehouse: 'Seçili depoyu sil',
        edit: 'Düzenle',
        delete: 'Sil'
      }
    },
    reports: {
      title: 'Raporlar',
      filtersCardTitle: 'Stok Raporu Filtreleri',
      startDate: 'Başlangıç Tarihi',
      endDate: 'Bitiş Tarihi',
      warehouse: 'Depo',
      warehouseAll: 'Tümü',
      format: 'Format',
      filters: {
        productName: 'Ürün Adı',
        productNameAll: 'Tümü',
        category: 'Kategori',
        categoryAll: 'Tümü',
        minPrice: 'Minimum Fiyat',
        maxPrice: 'Maksimum Fiyat'
      },
      formatOptions: {
        json: 'Ekranda Görüntüle',
        csv: 'CSV İndir',
        pdf: 'PDF İndir'
      },
      generate: 'Raporu Oluştur',
      print: 'Yazdır',
      helperText: 'Seçili tarih ve depo için stok raporu PDF ve CSV formatı ile dışa aktarabilirsiniz.',
      summaryTitle: 'Genel Özet',
      summary: {
        dateRange: 'Tarih Aralığı',
        totalProducts: 'Ürün Sayısı',
        totalStock: 'Toplam Stok',
        totalStockValue: 'Toplam Stok Değeri',
        inbound: 'Giriş',
        outbound: 'Çıkış'
      },
      detailTitle: 'Detaylı Ürün Listesi',
      table: {
        product: 'Ürün',
        warehouse: 'Depo',
        stock: 'Stok',
        unitPrice: 'Birim Fiyat',
        totalPrice: 'Toplam Fiyat',
        totalBtw: 'Toplam BTW',
        btwRate: 'BTW %',
        lastMovement: 'Son Hareket'
      },
      noItems: 'Kriterlere uygun kayıt bulunamadı.',
      error: 'Rapor oluşturulurken hata oluştu.'
    },
    barcode: {
      titleFallback: 'Barkod',
      notFound: 'Barkod bulunamadı.',
      print: 'Yazdır',
      download: 'İndir (SVG)',
      back: 'Geri'
    },
    invoices: {
      title: 'Faturalar',
      addButton: 'Yeni Fatura',
      table: {
        invoiceNumber: 'Fatura No',
        date: 'Tarih',
        customer: 'Müşteri',
        total: 'Toplam',
        status: 'Durum',
        actions: 'İşlemler'
      },
      form: {
        title: 'Fatura',
        editTitle: 'Faturayı Düzenle',
        newTitle: 'Yeni Fatura',
        invoiceInfo: 'Fatura Bilgileri',
        invoiceNumber: 'Fatura No:',
        invoiceDate: 'Fatura Tarihi:',
        dueDate: 'Vade Tarihi:',
        status: 'Durum:',
        customerInfo: 'Müşteri Bilgileri',
        customerName: 'Müşteri Adı',
        customerTaxNumber: 'Vergi No',
        customerAddress: 'Adres',
        customerEmail: 'E-posta',
        customerPhone: 'Telefon',
        itemsTitle: 'Fatura Kalemleri',
        addItem: 'Kalem Ekle',
        itemNumber: 'Sıra',
        product: 'Ürün',
        quantity: 'Miktar',
        unitPrice: 'Birim Fiyat',
        taxRate: 'KDV %',
        actions: 'İşlemler',
        itemDialog: {
          editTitle: 'Kalemi Düzenle',
          newTitle: 'Yeni Kalem',
          selectProduct: 'Ürün Seç',
          selectProductPlaceholder: 'Ürün Seçin',
          productName: 'Ürün Adı',
          productCode: 'Ürün Kodu',
          quantity: 'Miktar',
          unitPrice: 'Birim Fiyat',
          taxRate: 'KDV Oranı (%)',
          discount: 'İndirim (%)',
          description: 'Açıklama'
        },
        totals: {
          btwTotal: 'BTW Toplamı',
          subtotal: 'Ara Toplam',
          taxTotal: 'KDV Toplamı',
          grandTotal: 'Genel Toplam'
        },
        notes: 'Notlar',
        statusOptions: {
          DRAFT: 'Taslak',
          SENT: 'Gönderildi',
          PAID: 'Ödendi',
          CANCELLED: 'İptal'
        }
      },
      notifications: {
        createSuccess: 'Fatura başarıyla oluşturuldu',
        createError: 'Fatura oluşturulamadı',
        updateSuccess: 'Fatura başarıyla güncellendi',
        updateError: 'Fatura güncellenemedi',
        deleteSuccess: 'Fatura başarıyla silindi',
        deleteError: 'Fatura silinemedi',
        pdfSuccess: 'PDF başarıyla indirildi',
        pdfError: 'PDF indirilemedi',
        excelSuccess: 'Excel başarıyla indirildi',
        excelError: 'Excel indirilemedi'
      },
      confirmations: {
        delete: 'Bu faturayı silmek istediğinizden emin misiniz?'
      },
      tooltips: {
        pdf: 'PDF İndir',
        excel: 'Excel İndir',
        edit: 'Düzenle',
        delete: 'Sil'
      },
      empty: {
        noItems: 'Fatura kalemi yok',
        noInvoices: 'Fatura bulunamadı'
      }
    }
  },
  en: {
    common: {
      appTitle: 'StockTrack Control Panel',
      cancel: 'Cancel',
      save: 'Save',
      add: 'Add',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      loading: 'Loading...',
      noResults: 'No results found.',
      searchPlaceholder: 'Search product, category, serial or barcode...',
      yes: 'Yes',
      no: 'No',
      print: 'Print',
      download: 'Download',
      back: 'Back',
      notAvailable: '—'
    },
    nav: {
      dashboard: 'Dashboard',
      products: 'Products',
      invoices: 'Invoices',
      reports: 'Reports',
      settings: 'Settings'
    },
    settings: {
      title: 'Settings',
      languageCardTitle: 'Language Options',
      languageLabel: 'Language',
      languageHint: 'Language preference is stored in the browser and reused on next visit.',
      themeCardTitle: 'Theme Preference',
      darkModeLabel: 'Dark Mode',
      lightModeLabel: 'Light Mode',
      themeHint: 'Theme preference updates the application theme and is stored in the browser.'
    },
    dashboard: {
      title: 'Welcome',
      subtitle: 'Overview dashboard for barcode-enabled stock tracking.',
      cards: {
        totalProducts: {
          title: 'Total Products',
          description: 'Active product count'
        },
        totalStock: {
          title: 'Total Stock',
          description: 'Total stock quantity'
        },
        last24Hours: {
          title: 'Last 24 Hours',
          description: 'Recorded stock movements'
        }
      },
      filters: {
        startDate: 'Start Date',
        endDate: 'End Date'
      },
      recentMovements: {
        title: 'Latest Stock Movements',
        empty: 'No stock movement recorded yet.',
        unknownProduct: 'Product',
        unknownWarehouse: 'No warehouse info',
        inbound: 'Inbound',
        outbound: 'Outbound'
      }
    },
    products: {
      title: 'Products',
      addButton: 'New Product',
      table: {
        productName: 'Product Name',
        category: 'Category',
        unitPrice: 'Unit Price',
        unitBtw: 'Unit VAT',
        totalBtw: 'Total VAT',
        totalPrice: 'Total Price',
        btwRate: 'VAT %',
        stockQuantity: 'Stock Qty',
        serialNumber: 'Serial No.',
        warehouse: 'Warehouse',
        createdAt: 'Created At',
        barcode: 'Barcode',
        actions: 'Actions'
      },
      showBarcode: 'Show Barcode',
      filters: {
        searchPlaceholder: 'Search product, category, serial or barcode...'
      },
      notifications: {
        createSuccess: 'Product created',
        createError: 'Product could not be created',
        updateSuccess: 'Product updated',
        updateError: 'Product could not be updated',
        deleteSuccess: 'Product deleted',
        deleteError: 'Product could not be deleted',
        categoryCreateSuccess: 'Category added',
        categoryCreateError: 'Category could not be added',
        categoryDeleteSuccess: 'Category deleted',
        categoryDeleteError: 'Category could not be deleted',
        categoryRequired: 'Please enter a category name',
        productNameCreateSuccess: 'Product name added',
        productNameCreateError: 'Product name could not be added',
        productNameDeleteSuccess: 'Product name deleted',
        productNameDeleteError: 'Product name could not be deleted',
        productNameRequired: 'Please enter a product name',
        serialCreateSuccess: 'Serial number added',
        serialCreateError: 'Serial number could not be added',
        serialDeleteSuccess: 'Serial number deleted',
        serialDeleteError: 'Serial number could not be deleted',
        serialRequired: 'Please enter a serial number',
        warehouseCreateSuccess: 'Warehouse added',
        warehouseCreateError: 'Warehouse could not be added',
        warehouseDeleteSuccess: 'Warehouse deleted',
        warehouseDeleteError: 'Warehouse could not be deleted',
        warehouseRequired: 'Please enter a warehouse name'
      },
      confirmations: {
        deleteProduct: 'Are you sure you want to delete this product?',
        deleteCategory: 'Delete the selected category?',
        deleteProductName: 'Delete the selected product name?',
        deleteSerial: 'Delete the selected serial number?',
        deleteWarehouse: 'Delete the selected warehouse?'
      },
      form: {
        addTitle: 'Add New Product',
        productNameLabel: 'Product Name',
        productNamePlaceholder: 'Select product name',
        categoryLabel: 'Category',
        categoryPlaceholder: 'Select category',
        descriptionLabel: 'Description',
        unitPriceLabel: 'Unit Price',
        btwRateLabel: 'VAT Rate (%)',
        stockQuantityLabel: 'Stock Quantity',
        serialNumberLabel: 'Serial Number',
        serialNumberPlaceholder: 'Select serial number',
        warehouseLabel: 'Warehouse',
        warehousePlaceholder: 'Select warehouse',
        computedValuesTitle: 'Calculated Values',
        unitBtw: 'Unit VAT',
        unitGross: 'Unit Gross',
        totalBtw: 'Total VAT',
        totalGross: 'Total Gross',
        totalNet: 'Total Net',
        submit: 'Save',
        cancel: 'Cancel'
      },
      editDialog: {
        title: 'Update Product Information',
        unitPriceLabel: 'Unit Price (VAT Included)',
        stockQuantityLabel: 'Stock Quantity',
        reasonLabel: 'Movement Reason',
        reasonPlaceholder: 'Select reason',
        helperText: 'Choose this if you are making any change',
        customReasonLabel: 'Manual Note',
        customReasonPlaceholder: 'Optional description'
      },
      adjustmentReasons: {
        sale: 'Sale',
        disposal: 'Disposal',
        return: 'Return',
        purchase: 'Purchase',
        increase: 'Stock Increase',
        decrease: 'Stock Decrease',
        vatChange: 'VAT Rate Change',
        priceChange: 'Price Adjustment'
      },
      dialogs: {
        newProductNameTitle: 'New Product Name',
        newProductNameLabel: 'Product Name',
        newCategoryTitle: 'New Category',
        newCategoryLabel: 'Category Name',
        newSerialTitle: 'New Serial Number',
        newSerialLabel: 'Serial Number',
        newWarehouseTitle: 'New Warehouse',
        newWarehouseNameLabel: 'Warehouse Name',
        newWarehouseLocationLabel: 'Location (optional)',
        newWarehouseDescriptionLabel: 'Description (optional)'
      },
      tooltips: {
        addProductName: 'Add new product name',
        deleteProductName: 'Delete selected product name',
        addCategory: 'Add new category',
        deleteCategory: 'Delete selected category',
        addSerial: 'Add new serial number',
        deleteSerial: 'Delete selected serial number',
        addWarehouse: 'Add new warehouse',
        deleteWarehouse: 'Delete selected warehouse',
        edit: 'Edit',
        delete: 'Delete'
      }
    },
    reports: {
      title: 'Reports',
      filtersCardTitle: 'Stock Report Filters',
      startDate: 'Start Date',
      endDate: 'End Date',
      warehouse: 'Warehouse',
      warehouseAll: 'All',
      format: 'Format',
      filters: {
        productName: 'Product Name',
        productNameAll: 'All',
        category: 'Category',
        categoryAll: 'All',
        minPrice: 'Minimum Price',
        maxPrice: 'Maximum Price'
      },
      formatOptions: {
        json: 'View on Screen',
        csv: 'Download CSV',
        pdf: 'Download PDF'
      },
      generate: 'Generate Report',
      print: 'Print',
      helperText: 'You can export the selected date range and warehouse as PDF or CSV.',
      summaryTitle: 'Overall Summary',
      summary: {
        dateRange: 'Date Range',
        totalProducts: 'Product Count',
        totalStock: 'Total Stock',
        totalStockValue: 'Total Stock Value',
        inbound: 'Inbound',
        outbound: 'Outbound'
      },
      detailTitle: 'Detailed Product List',
      table: {
        product: 'Product',
        warehouse: 'Warehouse',
        stock: 'Stock',
        unitPrice: 'Unit Price',
        totalPrice: 'Total Price',
        totalBtw: 'Total VAT',
        btwRate: 'VAT %',
        lastMovement: 'Last Movement'
      },
      noItems: 'No records match the selected criteria.',
      error: 'An error occurred while generating the report.'
    },
    barcode: {
      titleFallback: 'Barcode',
      notFound: 'Barcode not found.',
      print: 'Print',
      download: 'Save (SVG)',
      back: 'Back'
    },
    invoices: {
      title: 'Invoices',
      addButton: 'New Invoice',
      table: {
        invoiceNumber: 'Invoice No',
        date: 'Date',
        customer: 'Customer',
        total: 'Total',
        status: 'Status',
        actions: 'Actions'
      },
      form: {
        title: 'Invoice',
        editTitle: 'Edit Invoice',
        newTitle: 'New Invoice',
        invoiceInfo: 'Invoice Information',
        invoiceNumber: 'Invoice No:',
        invoiceDate: 'Invoice Date:',
        dueDate: 'Due Date:',
        status: 'Status:',
        customerInfo: 'Customer Information',
        customerName: 'Customer Name',
        customerTaxNumber: 'Tax Number',
        customerAddress: 'Address',
        customerEmail: 'Email',
        customerPhone: 'Phone',
        itemsTitle: 'Invoice Items',
        addItem: 'Add Item',
        itemNumber: 'No',
        product: 'Product',
        quantity: 'Quantity',
        unitPrice: 'Unit Price',
        taxRate: 'VAT %',
        actions: 'Actions',
        itemDialog: {
          editTitle: 'Edit Item',
          newTitle: 'New Item',
          selectProduct: 'Select Product',
          selectProductPlaceholder: 'Select Product',
          productName: 'Product Name',
          productCode: 'Product Code',
          quantity: 'Quantity',
          unitPrice: 'Unit Price',
          taxRate: 'VAT Rate (%)',
          discount: 'Discount (%)',
          description: 'Description'
        },
        totals: {
          btwTotal: 'VAT Total',
          subtotal: 'Subtotal',
          taxTotal: 'VAT Total',
          grandTotal: 'Grand Total'
        },
        notes: 'Notes',
        statusOptions: {
          DRAFT: 'Draft',
          SENT: 'Sent',
          PAID: 'Paid',
          CANCELLED: 'Cancelled'
        }
      },
      notifications: {
        createSuccess: 'Invoice created successfully',
        createError: 'Invoice could not be created',
        updateSuccess: 'Invoice updated successfully',
        updateError: 'Invoice could not be updated',
        deleteSuccess: 'Invoice deleted successfully',
        deleteError: 'Invoice could not be deleted',
        pdfSuccess: 'PDF downloaded successfully',
        pdfError: 'PDF could not be downloaded',
        excelSuccess: 'Excel downloaded successfully',
        excelError: 'Excel could not be downloaded'
      },
      confirmations: {
        delete: 'Are you sure you want to delete this invoice?'
      },
      tooltips: {
        pdf: 'Download PDF',
        excel: 'Download Excel',
        edit: 'Edit',
        delete: 'Delete'
      },
      empty: {
        noItems: 'No invoice items',
        noInvoices: 'No invoices found'
      }
    }
  },
  nl: {
    common: {
      appTitle: 'StockTrack Controlepaneel',
      cancel: 'Annuleren',
      save: 'Opslaan',
      add: 'Toevoegen',
      delete: 'Verwijderen',
      edit: 'Bewerken',
      close: 'Sluiten',
      loading: 'Laden...',
      noResults: 'Geen resultaten gevonden.',
      searchPlaceholder: 'Zoek product, categorie, serienummer of barcode...',
      yes: 'Ja',
      no: 'Nee',
      print: 'Afdrukken',
      download: 'Downloaden',
      back: 'Terug',
      notAvailable: '—'
    },
    nav: {
      dashboard: 'Dashboard',
      products: 'Producten',
      invoices: 'Facturen',
      reports: 'Rapporten',
      settings: 'Instellingen'
    },
    settings: {
      title: 'Instellingen',
      languageCardTitle: 'Taalopties',
      languageLabel: 'Taal',
      languageHint: 'De taalkeuze wordt in de browser opgeslagen en opnieuw gebruikt.',
      themeCardTitle: 'Themapreferentie',
      darkModeLabel: 'Donkere modus',
      lightModeLabel: 'Lichte modus',
      themeHint: 'De themakeuze wordt opgeslagen en past het thema van de applicatie aan.'
    },
    dashboard: {
      title: 'Welkom',
      subtitle: 'Overzichts-dashboard voor barcodes ondersteunde voorraadopvolging.',
      cards: {
        totalProducts: {
          title: 'Totaal Producten',
          description: 'Aantal actieve producten'
        },
        totalStock: {
          title: 'Totale Voorraad',
          description: 'Totale voorraadhoeveelheid'
        },
        last24Hours: {
          title: 'Laatste 24 Uur',
          description: 'Geregistreerde voorraadbewegingen'
        }
      },
      filters: {
        startDate: 'Begindatum',
        endDate: 'Einddatum'
      },
      recentMovements: {
        title: 'Laatste voorraadbewegingen',
        empty: 'Nog geen voorraadbeweging geregistreerd.',
        unknownProduct: 'Product',
        unknownWarehouse: 'Geen magazijninformatie',
        inbound: 'Inkomend',
        outbound: 'Uitgaand'
      }
    },
    products: {
      title: 'Producten',
      addButton: 'Nieuw product',
      table: {
        productName: 'Productnaam',
        category: 'Categorie',
        unitPrice: 'Stukprijs',
        unitBtw: 'BTW per stuk',
        totalBtw: 'Totale BTW',
        totalPrice: 'Totale prijs',
        btwRate: 'BTW %',
        stockQuantity: 'Voorraad',
        serialNumber: 'Serienummer',
        warehouse: 'Magazijn',
        createdAt: 'Aanmaakdatum',
        barcode: 'Barcode',
        actions: 'Acties'
      },
      showBarcode: 'Barcode tonen',
      filters: {
        searchPlaceholder: 'Zoek product, categorie, serienummer of barcode...'
      },
      notifications: {
        createSuccess: 'Product aangemaakt',
        createError: 'Product kon niet worden aangemaakt',
        updateSuccess: 'Product bijgewerkt',
        updateError: 'Product kon niet worden bijgewerkt',
        deleteSuccess: 'Product verwijderd',
        deleteError: 'Product kon niet worden verwijderd',
        categoryCreateSuccess: 'Categorie toegevoegd',
        categoryCreateError: 'Categorie kon niet worden toegevoegd',
        categoryDeleteSuccess: 'Categorie verwijderd',
        categoryDeleteError: 'Categorie kon niet worden verwijderd',
        categoryRequired: 'Voer een categorienaam in',
        productNameCreateSuccess: 'Productnaam toegevoegd',
        productNameCreateError: 'Productnaam kon niet worden toegevoegd',
        productNameDeleteSuccess: 'Productnaam verwijderd',
        productNameDeleteError: 'Productnaam kon niet worden verwijderd',
        productNameRequired: 'Voer een productnaam in',
        serialCreateSuccess: 'Serienummer toegevoegd',
        serialCreateError: 'Serienummer kon niet worden toegevoegd',
        serialDeleteSuccess: 'Serienummer verwijderd',
        serialDeleteError: 'Serienummer kon niet worden verwijderd',
        serialRequired: 'Voer een serienummer in',
        warehouseCreateSuccess: 'Magazijn toegevoegd',
        warehouseCreateError: 'Magazijn kon niet worden toegevoegd',
        warehouseDeleteSuccess: 'Magazijn verwijderd',
        warehouseDeleteError: 'Magazijn kon niet worden verwijderd',
        warehouseRequired: 'Voer een magazijnnaam in'
      },
      confirmations: {
        deleteProduct: 'Weet u zeker dat u dit product wilt verwijderen?',
        deleteCategory: 'Geselecteerde categorie verwijderen?',
        deleteProductName: 'Geselecteerde productnaam verwijderen?',
        deleteSerial: 'Geselecteerd serienummer verwijderen?',
        deleteWarehouse: 'Geselecteerd magazijn verwijderen?'
      },
      form: {
        addTitle: 'Nieuw product toevoegen',
        productNameLabel: 'Productnaam',
        productNamePlaceholder: 'Selecteer productnaam',
        categoryLabel: 'Categorie',
        categoryPlaceholder: 'Selecteer categorie',
        descriptionLabel: 'Beschrijving',
        unitPriceLabel: 'Stukprijs',
        btwRateLabel: 'BTW-tarief (%)',
        stockQuantityLabel: 'Voorraad',
        serialNumberLabel: 'Serienummer',
        serialNumberPlaceholder: 'Selecteer serienummer',
        warehouseLabel: 'Magazijn',
        warehousePlaceholder: 'Selecteer magazijn',
        computedValuesTitle: 'Berekende waarden',
        unitBtw: 'BTW per stuk',
        unitGross: 'Bruto per stuk',
        totalBtw: 'Totale BTW',
        totalGross: 'Totale bruto',
        totalNet: 'Totale netto',
        submit: 'Opslaan',
        cancel: 'Annuleren'
      },
      editDialog: {
        title: 'Productgegevens bijwerken',
        unitPriceLabel: 'Stukprijs (incl. BTW)',
        stockQuantityLabel: 'Voorraad',
        reasonLabel: 'Bewegingsreden',
        reasonPlaceholder: 'Kies reden',
        helperText: 'Kies dit wanneer u een wijziging doorvoert',
        customReasonLabel: 'Handmatige notitie',
        customReasonPlaceholder: 'Optionele beschrijving'
      },
      adjustmentReasons: {
        sale: 'Verkoop',
        disposal: 'Afvoer',
        return: 'Retour',
        purchase: 'Inkoop',
        increase: 'Voorraad toename',
        decrease: 'Voorraad afname',
        vatChange: 'BTW-tarief wijziging',
        priceChange: 'Prijsaanpassing'
      },
      dialogs: {
        newProductNameTitle: 'Nieuwe productnaam',
        newProductNameLabel: 'Productnaam',
        newCategoryTitle: 'Nieuwe categorie',
        newCategoryLabel: 'Categorienaam',
        newSerialTitle: 'Nieuw serienummer',
        newSerialLabel: 'Serienummer',
        newWarehouseTitle: 'Nieuw magazijn',
        newWarehouseNameLabel: 'Magazijnnaam',
        newWarehouseLocationLabel: 'Locatie (optioneel)',
        newWarehouseDescriptionLabel: 'Beschrijving (optioneel)'
      },
      tooltips: {
        addProductName: 'Nieuwe productnaam toevoegen',
        deleteProductName: 'Geselecteerde productnaam verwijderen',
        addCategory: 'Nieuwe categorie toevoegen',
        deleteCategory: 'Geselecteerde categorie verwijderen',
        addSerial: 'Nieuw serienummer toevoegen',
        deleteSerial: 'Geselecteerd serienummer verwijderen',
        addWarehouse: 'Nieuw magazijn toevoegen',
        deleteWarehouse: 'Geselecteerd magazijn verwijderen',
        edit: 'Bewerken',
        delete: 'Verwijderen'
      }
    },
    reports: {
      title: 'Rapporten',
      filtersCardTitle: 'Voorraadrapport filters',
      startDate: 'Begindatum',
      endDate: 'Einddatum',
      warehouse: 'Magazijn',
      warehouseAll: 'Alle',
      format: 'Formaat',
      filters: {
        productName: 'Productnaam',
        productNameAll: 'Alle',
        category: 'Categorie',
        categoryAll: 'Alle',
        minPrice: 'Minimum prijs',
        maxPrice: 'Maximum prijs'
      },
      formatOptions: {
        json: 'Op scherm bekijken',
        csv: 'CSV downloaden',
        pdf: 'PDF downloaden'
      },
      generate: 'Rapport genereren',
      print: 'Afdrukken',
      helperText: 'Exporteer het geselecteerde bereik als PDF of CSV.',
      summaryTitle: 'Algemene samenvatting',
      summary: {
        dateRange: 'Datumbereik',
        totalProducts: 'Aantal producten',
        totalStock: 'Totale voorraad',
        totalStockValue: 'Totale voorraadwaarde',
        inbound: 'Inkomend',
        outbound: 'Uitgaand'
      },
      detailTitle: 'Gedetailleerde productlijst',
      table: {
        product: 'Product',
        warehouse: 'Magazijn',
        stock: 'Voorraad',
        unitPrice: 'Stukprijs',
        totalPrice: 'Totale prijs',
        totalBtw: 'Totale BTW',
        btwRate: 'BTW %',
        lastMovement: 'Laatste beweging'
      },
      noItems: 'Geen records die aan de criteria voldoen.',
      error: 'Er is een fout opgetreden bij het genereren van het rapport.'
    },
    barcode: {
      titleFallback: 'Barcode',
      notFound: 'Geen barcode gevonden.',
      print: 'Afdrukken',
      download: 'Opslaan (SVG)',
      back: 'Terug'
    },
    invoices: {
      title: 'Facturen',
      addButton: 'Nieuwe Factuur',
      table: {
        invoiceNumber: 'Factuurnummer',
        date: 'Datum',
        customer: 'Klant',
        total: 'Totaal',
        status: 'Status',
        actions: 'Acties'
      },
      form: {
        title: 'Factuur',
        editTitle: 'Factuur Bewerken',
        newTitle: 'Nieuwe Factuur',
        invoiceInfo: 'Factuurgegevens',
        invoiceNumber: 'Factuurnummer:',
        invoiceDate: 'Factuurdatum:',
        dueDate: 'Vervaldatum:',
        status: 'Status:',
        customerInfo: 'Klantgegevens',
        customerName: 'Klantnaam',
        customerTaxNumber: 'BTW-nummer',
        customerAddress: 'Adres',
        customerEmail: 'E-mail',
        customerPhone: 'Telefoon',
        itemsTitle: 'Factuurregels',
        addItem: 'Regel Toevoegen',
        itemNumber: 'Nr',
        product: 'Product',
        quantity: 'Hoeveelheid',
        unitPrice: 'Stukprijs',
        taxRate: 'BTW %',
        actions: 'Acties',
        itemDialog: {
          editTitle: 'Regel Bewerken',
          newTitle: 'Nieuwe Regel',
          selectProduct: 'Selecteer Product',
          selectProductPlaceholder: 'Selecteer Product',
          productName: 'Productnaam',
          productCode: 'Productcode',
          quantity: 'Hoeveelheid',
          unitPrice: 'Stukprijs',
          taxRate: 'BTW-tarief (%)',
          discount: 'Korting (%)',
          description: 'Beschrijving'
        },
        totals: {
          btwTotal: 'BTW Totaal',
          subtotal: 'Subtotaal',
          taxTotal: 'BTW Totaal',
          grandTotal: 'Totaal'
        },
        notes: 'Notities',
        statusOptions: {
          DRAFT: 'Concept',
          SENT: 'Verzonden',
          PAID: 'Betaald',
          CANCELLED: 'Geannuleerd'
        }
      },
      notifications: {
        createSuccess: 'Factuur succesvol aangemaakt',
        createError: 'Factuur kon niet worden aangemaakt',
        updateSuccess: 'Factuur succesvol bijgewerkt',
        updateError: 'Factuur kon niet worden bijgewerkt',
        deleteSuccess: 'Factuur succesvol verwijderd',
        deleteError: 'Factuur kon niet worden verwijderd',
        pdfSuccess: 'PDF succesvol gedownload',
        pdfError: 'PDF kon niet worden gedownload',
        excelSuccess: 'Excel succesvol gedownload',
        excelError: 'Excel kon niet worden gedownload'
      },
      confirmations: {
        delete: 'Weet u zeker dat u deze factuur wilt verwijderen?'
      },
      tooltips: {
        pdf: 'PDF Downloaden',
        excel: 'Excel Downloaden',
        edit: 'Bewerken',
        delete: 'Verwijderen'
      },
      empty: {
        noItems: 'Geen factuurregels',
        noInvoices: 'Geen facturen gevonden'
      }
    }
  }
};
