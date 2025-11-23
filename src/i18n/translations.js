export const translations = {
  tr: {
    common: {
      appTitle: 'Stok Takip',
      notAvailable: 'Mevcut değil',
      loading: 'Yükleniyor...',
      noResults: 'Sonuç bulunamadı',
      cancel: 'İptal',
      save: 'Kaydet'
    },
    nav: {
      dashboard: 'Dashboard',
      products: 'Ürünler',
      invoices: 'Faturalar',
      reports: 'Raporlar',
      settings: 'Ayarlar'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Stok takip sistemine hoş geldiniz',
      filters: {
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi'
      },
      cards: {
        totalProducts: {
          title: 'Toplam Ürün',
          description: 'Sistemdeki toplam ürün sayısı'
        },
        totalStock: {
          title: 'Toplam Stok',
          description: 'Tüm depolardaki toplam stok miktarı'
        },
        last24Hours: {
          title: 'Son 24 Saat',
          description: 'Son 24 saatteki hareket sayısı'
        }
      },
      recentMovements: {
        title: 'Son Stok Hareketleri',
        empty: 'Stok hareketi bulunamadı',
        inbound: 'Giriş',
        outbound: 'Çıkış',
        unknownProduct: 'Bilinmeyen Ürün',
        unknownWarehouse: 'Bilinmeyen Depo'
      }
    },
    products: {
      title: 'Ürünler',
      addButton: 'Yeni Ürün Ekle',
      filters: {
        searchPlaceholder: 'Ürün ara...'
      },
      error: {
        loading: 'Ürünler yüklenirken hata oluştu'
      },
      table: {
        productName: 'Ürün Adı',
        category: 'Kategori',
        unitPrice: 'Birim Fiyat',
        unitBtw: 'Birim BTW',
        totalBtw: 'Toplam BTW',
        totalPrice: 'Toplam Fiyat',
        btwRate: 'BTW Oranı',
        stockQuantity: 'Stok Miktarı',
        serialNumber: 'Seri Numarası',
        warehouse: 'Depo',
        createdAt: 'Oluşturulma Tarihi',
        barcode: 'Barkod',
        actions: 'İşlemler'
      },
      form: {
        addTitle: 'Yeni Ürün Ekle',
        editTitle: 'Ürünü Düzenle',
        productNameLabel: 'Ürün Adı',
        productNamePlaceholder: 'Ürün adı seçin',
        categoryLabel: 'Kategori',
        categoryPlaceholder: 'Kategori seçin',
        serialNumberLabel: 'Seri Numarası',
        serialNumberPlaceholder: 'Seri numarası seçin',
        warehouseLabel: 'Depo',
        warehousePlaceholder: 'Depo seçin',
        unitPriceLabel: 'Birim Fiyat (Net)',
        btwRateLabel: 'BTW Oranı (%)',
        stockQuantityLabel: 'Stok Miktarı',
        descriptionLabel: 'Açıklama',
        descriptionPlaceholder: 'Açıklama girin',
        stockAdjustmentReasonLabel: 'Stok Düzenleme Nedeni',
        stockAdjustmentReasonPlaceholder: 'Neden seçin',
        preview: {
          title: 'Önizleme',
          unitNet: 'Birim Net',
          unitBtw: 'Birim BTW',
          unitGross: 'Birim Brüt',
          totalNet: 'Toplam Net',
          totalBtw: 'Toplam BTW',
          totalGross: 'Toplam Brüt'
        },
        computedValuesTitle: 'Hesaplanan Değerler',
        unitBtw: 'Birim BTW',
        unitGross: 'Birim Brüt',
        totalNet: 'Toplam Net',
        totalBtw: 'Toplam BTW',
        totalGross: 'Toplam Brüt'
      },
      dialogs: {
        newProductNameTitle: 'Yeni Ürün Adı',
        newProductNameLabel: 'Ürün Adı'
      },
      editDialog: {
        title: 'Ürünü Düzenle',
        unitPriceLabel: 'Birim Fiyat (Net)'
      },
      tooltips: {
        edit: 'Düzenle',
        delete: 'Sil',
        addProductName: 'Yeni ürün adı ekle',
        deleteProductName: 'Ürün adını sil',
        addCategory: 'Yeni kategori ekle',
        deleteCategory: 'Kategoriyi sil',
        addSerialNumber: 'Yeni seri numarası ekle',
        deleteSerialNumber: 'Seri numarasını sil',
        addSerial: 'Yeni seri numarası ekle',
        deleteSerial: 'Seri numarasını sil',
        addWarehouse: 'Yeni depo ekle',
        deleteWarehouse: 'Depoyu sil'
      },
      showBarcode: 'Barkod Göster',
      adjustmentReasons: {
        sale: 'Satış',
        disposal: 'İmha',
        return: 'İade',
        purchase: 'Satın Alma',
        increase: 'Artış',
        decrease: 'Azalış',
        vatChange: 'BTW Değişikliği',
        priceChange: 'Fiyat Değişikliği'
      },
      notifications: {
        createSuccess: 'Ürün başarıyla oluşturuldu',
        createError: 'Ürün oluşturulurken hata oluştu',
        updateSuccess: 'Ürün başarıyla güncellendi',
        updateError: 'Ürün güncellenirken hata oluştu',
        deleteSuccess: 'Ürün başarıyla silindi',
        deleteError: 'Ürün silinirken hata oluştu',
        categoryCreateSuccess: 'Kategori başarıyla oluşturuldu',
        categoryCreateError: 'Kategori oluşturulurken hata oluştu',
        categoryDeleteSuccess: 'Kategori başarıyla silindi',
        categoryDeleteError: 'Kategori silinirken hata oluştu',
        categoryRequired: 'Kategori adı gereklidir',
        productNameCreateSuccess: 'Ürün adı başarıyla oluşturuldu',
        productNameCreateError: 'Ürün adı oluşturulurken hata oluştu',
        productNameDeleteSuccess: 'Ürün adı başarıyla silindi',
        productNameDeleteError: 'Ürün adı silinirken hata oluştu',
        productNameRequired: 'Ürün adı gereklidir',
        serialCreateSuccess: 'Seri numarası başarıyla oluşturuldu',
        serialCreateError: 'Seri numarası oluşturulurken hata oluştu',
        serialDeleteSuccess: 'Seri numarası başarıyla silindi',
        serialDeleteError: 'Seri numarası silinirken hata oluştu',
        serialRequired: 'Seri numarası gereklidir',
        warehouseCreateSuccess: 'Depo başarıyla oluşturuldu',
        warehouseCreateError: 'Depo oluşturulurken hata oluştu',
        warehouseDeleteSuccess: 'Depo başarıyla silindi',
        warehouseDeleteError: 'Depo silinirken hata oluştu',
        warehouseRequired: 'Depo adı gereklidir'
      },
      confirmations: {
        deleteProduct: 'Bu ürünü silmek istediğinizden emin misiniz?',
        deleteCategory: 'Bu kategoriyi silmek istediğinizden emin misiniz?',
        deleteProductName: 'Bu ürün adını silmek istediğinizden emin misiniz?',
        deleteSerial: 'Bu seri numarasını silmek istediğinizden emin misiniz?',
        deleteWarehouse: 'Bu depoyu silmek istediğinizden emin misiniz?'
      }
    },
    reports: {
      title: 'Raporlar',
      filtersCardTitle: 'Filtreler',
      startDate: 'Başlangıç Tarihi',
      endDate: 'Bitiş Tarihi',
      warehouse: 'Depo',
      warehouseAll: 'Tüm Depolar',
      format: 'Format',
      formatOptions: {
        json: 'JSON',
        csv: 'CSV',
        pdf: 'PDF'
      },
      filters: {
        productName: 'Ürün Adı',
        productNameAll: 'Tüm Ürünler',
        category: 'Kategori',
        categoryAll: 'Tüm Kategoriler',
        minPrice: 'Minimum Fiyat',
        maxPrice: 'Maximum Fiyat'
      },
      generate: 'Rapor Oluştur',
      print: 'Yazdır',
      helperText: 'Raporu oluşturmak için filtreleri seçin ve "Rapor Oluştur" butonuna tıklayın.',
      error: 'Rapor oluşturulurken hata oluştu',
      summaryTitle: 'Özet',
      summary: {
        dateRange: 'Tarih Aralığı',
        totalProducts: 'Toplam Ürün',
        totalStock: 'Toplam Stok',
        totalStockValue: 'Toplam Stok Değeri',
        inbound: 'Giriş',
        outbound: 'Çıkış'
      },
      detailTitle: 'Detaylar',
      table: {
        product: 'Ürün',
        warehouse: 'Depo',
        stock: 'Stok',
        unitPrice: 'Birim Fiyat',
        totalPrice: 'Toplam Fiyat',
        totalBtw: 'Toplam BTW',
        btwRate: 'BTW Oranı',
        lastMovement: 'Son Hareket'
      },
      noItems: 'Rapor için öğe bulunamadı'
    },
    settings: {
      title: 'Ayarlar',
      languageCardTitle: 'Dil Ayarları',
      languageLabel: 'Dil',
      languageHint: 'Uygulama dilini seçin',
      themeCardTitle: 'Tema Ayarları',
      darkModeLabel: 'Karanlık Mod',
      lightModeLabel: 'Açık Mod',
      themeHint: 'Tema tercihinizi seçin'
    }
  },
  en: {
    common: {
      appTitle: 'Stock Management',
      notAvailable: 'Not available',
      loading: 'Loading...',
      noResults: 'No results found',
      cancel: 'Cancel',
      save: 'Save'
    },
    nav: {
      dashboard: 'Dashboard',
      products: 'Products',
      invoices: 'Invoices',
      reports: 'Reports',
      settings: 'Settings'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome to the stock management system',
      filters: {
        startDate: 'Start Date',
        endDate: 'End Date'
      },
      cards: {
        totalProducts: {
          title: 'Total Products',
          description: 'Total number of products in the system'
        },
        totalStock: {
          title: 'Total Stock',
          description: 'Total stock quantity across all warehouses'
        },
        last24Hours: {
          title: 'Last 24 Hours',
          description: 'Number of movements in the last 24 hours'
        }
      },
      recentMovements: {
        title: 'Recent Stock Movements',
        empty: 'No stock movements found',
        inbound: 'Inbound',
        outbound: 'Outbound',
        unknownProduct: 'Unknown Product',
        unknownWarehouse: 'Unknown Warehouse'
      }
    },
    products: {
      title: 'Products',
      addButton: 'Add New Product',
      filters: {
        searchPlaceholder: 'Search products...'
      },
      error: {
        loading: 'Error loading products'
      },
      table: {
        productName: 'Product Name',
        category: 'Category',
        unitPrice: 'Unit Price',
        unitBtw: 'Unit VAT',
        totalBtw: 'Total VAT',
        totalPrice: 'Total Price',
        btwRate: 'VAT Rate',
        stockQuantity: 'Stock Quantity',
        serialNumber: 'Serial Number',
        warehouse: 'Warehouse',
        createdAt: 'Created At',
        barcode: 'Barcode',
        actions: 'Actions'
      },
      form: {
        addTitle: 'Add New Product',
        editTitle: 'Edit Product',
        productNameLabel: 'Product Name',
        productNamePlaceholder: 'Select product name',
        categoryLabel: 'Category',
        categoryPlaceholder: 'Select category',
        serialNumberLabel: 'Serial Number',
        serialNumberPlaceholder: 'Select serial number',
        warehouseLabel: 'Warehouse',
        warehousePlaceholder: 'Select warehouse',
        unitPriceLabel: 'Unit Price (Net)',
        btwRateLabel: 'VAT Rate (%)',
        stockQuantityLabel: 'Stock Quantity',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Enter description',
        stockAdjustmentReasonLabel: 'Stock Adjustment Reason',
        stockAdjustmentReasonPlaceholder: 'Select reason',
        preview: {
          title: 'Preview',
          unitNet: 'Unit Net',
          unitBtw: 'Unit VAT',
          unitGross: 'Unit Gross',
          totalNet: 'Total Net',
          totalBtw: 'Total VAT',
          totalGross: 'Total Gross'
        },
        computedValuesTitle: 'Computed Values',
        unitBtw: 'Unit VAT',
        unitGross: 'Unit Gross',
        totalNet: 'Total Net',
        totalBtw: 'Total VAT',
        totalGross: 'Total Gross'
      },
      dialogs: {
        newProductNameTitle: 'New Product Name',
        newProductNameLabel: 'Product Name'
      },
      editDialog: {
        title: 'Edit Product',
        unitPriceLabel: 'Unit Price (Net)'
      },
      tooltips: {
        edit: 'Edit',
        delete: 'Delete',
        addProductName: 'Add new product name',
        deleteProductName: 'Delete product name',
        addCategory: 'Add new category',
        deleteCategory: 'Delete category',
        addSerialNumber: 'Add new serial number',
        deleteSerialNumber: 'Delete serial number',
        addSerial: 'Add new serial number',
        deleteSerial: 'Delete serial number',
        addWarehouse: 'Add new warehouse',
        deleteWarehouse: 'Delete warehouse'
      },
      showBarcode: 'Show Barcode',
      adjustmentReasons: {
        sale: 'Sale',
        disposal: 'Disposal',
        return: 'Return',
        purchase: 'Purchase',
        increase: 'Increase',
        decrease: 'Decrease',
        vatChange: 'VAT Change',
        priceChange: 'Price Change'
      },
      notifications: {
        createSuccess: 'Product created successfully',
        createError: 'Error creating product',
        updateSuccess: 'Product updated successfully',
        updateError: 'Error updating product',
        deleteSuccess: 'Product deleted successfully',
        deleteError: 'Error deleting product',
        categoryCreateSuccess: 'Category created successfully',
        categoryCreateError: 'Error creating category',
        categoryDeleteSuccess: 'Category deleted successfully',
        categoryDeleteError: 'Error deleting category',
        categoryRequired: 'Category name is required',
        productNameCreateSuccess: 'Product name created successfully',
        productNameCreateError: 'Error creating product name',
        productNameDeleteSuccess: 'Product name deleted successfully',
        productNameDeleteError: 'Error deleting product name',
        productNameRequired: 'Product name is required',
        serialCreateSuccess: 'Serial number created successfully',
        serialCreateError: 'Error creating serial number',
        serialDeleteSuccess: 'Serial number deleted successfully',
        serialDeleteError: 'Error deleting serial number',
        serialRequired: 'Serial number is required',
        warehouseCreateSuccess: 'Warehouse created successfully',
        warehouseCreateError: 'Error creating warehouse',
        warehouseDeleteSuccess: 'Warehouse deleted successfully',
        warehouseDeleteError: 'Error deleting warehouse',
        warehouseRequired: 'Warehouse name is required'
      },
      confirmations: {
        deleteProduct: 'Are you sure you want to delete this product?',
        deleteCategory: 'Are you sure you want to delete this category?',
        deleteProductName: 'Are you sure you want to delete this product name?',
        deleteSerial: 'Are you sure you want to delete this serial number?',
        deleteWarehouse: 'Are you sure you want to delete this warehouse?'
      }
    },
    reports: {
      title: 'Reports',
      filtersCardTitle: 'Filters',
      startDate: 'Start Date',
      endDate: 'End Date',
      warehouse: 'Warehouse',
      warehouseAll: 'All Warehouses',
      format: 'Format',
      formatOptions: {
        json: 'JSON',
        csv: 'CSV',
        pdf: 'PDF'
      },
      filters: {
        productName: 'Product Name',
        productNameAll: 'All Products',
        category: 'Category',
        categoryAll: 'All Categories',
        minPrice: 'Minimum Price',
        maxPrice: 'Maximum Price'
      },
      generate: 'Generate Report',
      print: 'Print',
      helperText: 'Select filters and click "Generate Report" to create the report.',
      error: 'Error generating report',
      summaryTitle: 'Summary',
      summary: {
        dateRange: 'Date Range',
        totalProducts: 'Total Products',
        totalStock: 'Total Stock',
        totalStockValue: 'Total Stock Value',
        inbound: 'Inbound',
        outbound: 'Outbound'
      },
      detailTitle: 'Details',
      table: {
        product: 'Product',
        warehouse: 'Warehouse',
        stock: 'Stock',
        unitPrice: 'Unit Price',
        totalPrice: 'Total Price',
        totalBtw: 'Total VAT',
        btwRate: 'VAT Rate',
        lastMovement: 'Last Movement'
      },
      noItems: 'No items found for report'
    },
    settings: {
      title: 'Settings',
      languageCardTitle: 'Language Settings',
      languageLabel: 'Language',
      languageHint: 'Select application language',
      themeCardTitle: 'Theme Settings',
      darkModeLabel: 'Dark Mode',
      lightModeLabel: 'Light Mode',
      themeHint: 'Select your theme preference'
    }
  },
  nl: {
    common: {
      appTitle: 'Voorraadbeheer',
      notAvailable: 'Niet beschikbaar',
      loading: 'Laden...',
      noResults: 'Geen resultaten gevonden',
      cancel: 'Annuleren',
      save: 'Opslaan'
    },
    nav: {
      dashboard: 'Dashboard',
      products: 'Producten',
      invoices: 'Facturen',
      reports: 'Rapporten',
      settings: 'Instellingen'
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welkom bij het voorraadbeheersysteem',
      filters: {
        startDate: 'Startdatum',
        endDate: 'Einddatum'
      },
      cards: {
        totalProducts: {
          title: 'Totaal Producten',
          description: 'Totaal aantal producten in het systeem'
        },
        totalStock: {
          title: 'Totale Voorraad',
          description: 'Totale voorraadhoeveelheid in alle magazijnen'
        },
        last24Hours: {
          title: 'Laatste 24 Uur',
          description: 'Aantal bewegingen in de laatste 24 uur'
        }
      },
      recentMovements: {
        title: 'Recente Voorraadbewegingen',
        empty: 'Geen voorraadbewegingen gevonden',
        inbound: 'Inkomend',
        outbound: 'Uitgaand',
        unknownProduct: 'Onbekend Product',
        unknownWarehouse: 'Onbekend Magazijn'
      }
    },
    products: {
      title: 'Producten',
      addButton: 'Nieuw Product Toevoegen',
      filters: {
        searchPlaceholder: 'Zoek producten...'
      },
      error: {
        loading: 'Fout bij het laden van producten'
      },
      table: {
        productName: 'Productnaam',
        category: 'Categorie',
        unitPrice: 'Eenheidsprijs',
        unitBtw: 'Eenheid BTW',
        totalBtw: 'Totale BTW',
        totalPrice: 'Totale Prijs',
        btwRate: 'BTW-tarief',
        stockQuantity: 'Voorraadhoeveelheid',
        serialNumber: 'Serienummer',
        warehouse: 'Magazijn',
        createdAt: 'Aangemaakt Op',
        barcode: 'Barcode',
        actions: 'Acties'
      },
      form: {
        addTitle: 'Nieuw Product Toevoegen',
        editTitle: 'Product Bewerken',
        productNameLabel: 'Productnaam',
        productNamePlaceholder: 'Selecteer productnaam',
        categoryLabel: 'Categorie',
        categoryPlaceholder: 'Selecteer categorie',
        serialNumberLabel: 'Serienummer',
        serialNumberPlaceholder: 'Selecteer serienummer',
        warehouseLabel: 'Magazijn',
        warehousePlaceholder: 'Selecteer magazijn',
        unitPriceLabel: 'Eenheidsprijs (Netto)',
        btwRateLabel: 'BTW-tarief (%)',
        stockQuantityLabel: 'Voorraadhoeveelheid',
        descriptionLabel: 'Beschrijving',
        descriptionPlaceholder: 'Voer beschrijving in',
        stockAdjustmentReasonLabel: 'Voorraadaanpassing Reden',
        stockAdjustmentReasonPlaceholder: 'Selecteer reden',
        preview: {
          title: 'Voorbeeld',
          unitNet: 'Eenheid Netto',
          unitBtw: 'Eenheid BTW',
          unitGross: 'Eenheid Bruto',
          totalNet: 'Totaal Netto',
          totalBtw: 'Totaal BTW',
          totalGross: 'Totaal Bruto'
        },
        computedValuesTitle: 'Berekende Waarden',
        unitBtw: 'Eenheid BTW',
        unitGross: 'Eenheid Bruto',
        totalNet: 'Totaal Netto',
        totalBtw: 'Totaal BTW',
        totalGross: 'Totaal Bruto'
      },
      dialogs: {
        newProductNameTitle: 'Nieuwe Productnaam',
        newProductNameLabel: 'Productnaam'
      },
      editDialog: {
        title: 'Product Bewerken',
        unitPriceLabel: 'Eenheidsprijs (Netto)'
      },
      tooltips: {
        edit: 'Bewerken',
        delete: 'Verwijderen',
        addProductName: 'Nieuwe productnaam toevoegen',
        deleteProductName: 'Productnaam verwijderen',
        addCategory: 'Nieuwe categorie toevoegen',
        deleteCategory: 'Categorie verwijderen',
        addSerialNumber: 'Nieuw serienummer toevoegen',
        deleteSerialNumber: 'Serienummer verwijderen',
        addSerial: 'Nieuw serienummer toevoegen',
        deleteSerial: 'Serienummer verwijderen',
        addWarehouse: 'Nieuw magazijn toevoegen',
        deleteWarehouse: 'Magazijn verwijderen'
      },
      showBarcode: 'Barcode Tonen',
      adjustmentReasons: {
        sale: 'Verkoop',
        disposal: 'Vernietiging',
        return: 'Retour',
        purchase: 'Aankoop',
        increase: 'Toename',
        decrease: 'Afname',
        vatChange: 'BTW Wijziging',
        priceChange: 'Prijs Wijziging'
      },
      notifications: {
        createSuccess: 'Product succesvol aangemaakt',
        createError: 'Fout bij het aanmaken van product',
        updateSuccess: 'Product succesvol bijgewerkt',
        updateError: 'Fout bij het bijwerken van product',
        deleteSuccess: 'Product succesvol verwijderd',
        deleteError: 'Fout bij het verwijderen van product',
        categoryCreateSuccess: 'Categorie succesvol aangemaakt',
        categoryCreateError: 'Fout bij het aanmaken van categorie',
        categoryDeleteSuccess: 'Categorie succesvol verwijderd',
        categoryDeleteError: 'Fout bij het verwijderen van categorie',
        categoryRequired: 'Categorienaam is verplicht',
        productNameCreateSuccess: 'Productnaam succesvol aangemaakt',
        productNameCreateError: 'Fout bij het aanmaken van productnaam',
        productNameDeleteSuccess: 'Productnaam succesvol verwijderd',
        productNameDeleteError: 'Fout bij het verwijderen van productnaam',
        productNameRequired: 'Productnaam is verplicht',
        serialCreateSuccess: 'Serienummer succesvol aangemaakt',
        serialCreateError: 'Fout bij het aanmaken van serienummer',
        serialDeleteSuccess: 'Serienummer succesvol verwijderd',
        serialDeleteError: 'Fout bij het verwijderen van serienummer',
        serialRequired: 'Serienummer is verplicht',
        warehouseCreateSuccess: 'Magazijn succesvol aangemaakt',
        warehouseCreateError: 'Fout bij het aanmaken van magazijn',
        warehouseDeleteSuccess: 'Magazijn succesvol verwijderd',
        warehouseDeleteError: 'Fout bij het verwijderen van magazijn',
        warehouseRequired: 'Magazijnnaam is verplicht'
      },
      confirmations: {
        deleteProduct: 'Weet u zeker dat u dit product wilt verwijderen?',
        deleteCategory: 'Weet u zeker dat u deze categorie wilt verwijderen?',
        deleteProductName: 'Weet u zeker dat u deze productnaam wilt verwijderen?',
        deleteSerial: 'Weet u zeker dat u dit serienummer wilt verwijderen?',
        deleteWarehouse: 'Weet u zeker dat u dit magazijn wilt verwijderen?'
      }
    },
    reports: {
      title: 'Rapporten',
      filtersCardTitle: 'Filters',
      startDate: 'Startdatum',
      endDate: 'Einddatum',
      warehouse: 'Magazijn',
      warehouseAll: 'Alle Magazijnen',
      format: 'Formaat',
      formatOptions: {
        json: 'JSON',
        csv: 'CSV',
        pdf: 'PDF'
      },
      filters: {
        productName: 'Productnaam',
        productNameAll: 'Alle Producten',
        category: 'Categorie',
        categoryAll: 'Alle Categorieën',
        minPrice: 'Minimum Prijs',
        maxPrice: 'Maximum Prijs'
      },
      generate: 'Rapport Genereren',
      print: 'Afdrukken',
      helperText: 'Selecteer filters en klik op "Rapport Genereren" om het rapport aan te maken.',
      error: 'Fout bij het genereren van rapport',
      summaryTitle: 'Samenvatting',
      summary: {
        dateRange: 'Datumbereik',
        totalProducts: 'Totaal Producten',
        totalStock: 'Totale Voorraad',
        totalStockValue: 'Totale Voorraadwaarde',
        inbound: 'Inkomend',
        outbound: 'Uitgaand'
      },
      detailTitle: 'Details',
      table: {
        product: 'Product',
        warehouse: 'Magazijn',
        stock: 'Voorraad',
        unitPrice: 'Eenheidsprijs',
        totalPrice: 'Totale Prijs',
        totalBtw: 'Totale BTW',
        btwRate: 'BTW-tarief',
        lastMovement: 'Laatste Beweging'
      },
      noItems: 'Geen items gevonden voor rapport'
    },
    settings: {
      title: 'Instellingen',
      languageCardTitle: 'Taalinstellingen',
      languageLabel: 'Taal',
      languageHint: 'Selecteer applicatietaal',
      themeCardTitle: 'Thema-instellingen',
      darkModeLabel: 'Donkere Modus',
      lightModeLabel: 'Lichte Modus',
      themeHint: 'Selecteer uw thema voorkeur'
    }
  }
};

